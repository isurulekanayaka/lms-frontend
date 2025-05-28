import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  FileText, 
  BookOpen, 
  Clock, 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Filter,
  BarChart3
} from 'lucide-react';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Mock data
  const stats = {
    announcements: 12,
    examSchedules: 8,
    gradeReports: 45,
    studyMaterials: 23,
    timetables: 15,
    users: 150
  };

  const recentAnnouncements = [
    { id: 1, title: 'Mid-term Exam Schedule', type: 'exam', audience: 'students', date: '2025-05-29' },
    { id: 2, title: 'Library Maintenance', type: 'maintenance', audience: 'all', date: '2025-05-28' },
    { id: 3, title: 'New Study Materials Available', type: 'academic', audience: 'students', date: '2025-05-27' }
  ];

  const upcomingExams = [
    { id: 1, module: 'Mathematics 101', date: '2025-06-05', time: '09:00-11:00' },
    { id: 2, module: 'Physics 201', date: '2025-06-07', time: '14:00-16:00' },
    { id: 3, module: 'Chemistry 301', date: '2025-06-10', time: '10:00-12:00' }
  ];

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        active 
          ? 'bg-red-500 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className={`p-6 rounded-xl shadow-lg ${color} text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <Icon size={40} className="opacity-80" />
      </div>
    </div>
  );

  const ActionButton = ({ onClick, icon: Icon, label, color = 'bg-blue-500' }) => (
    <button
      onClick={onClick}
      className={`${color} text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Announcements" 
          value={stats.announcements} 
          icon={Bell} 
          color="bg-red-500" 
        />
        <StatCard 
          title="Exam Schedules" 
          value={stats.examSchedules} 
          icon={Calendar} 
          color="bg-slate-700" 
        />
        <StatCard 
          title="Grade Reports" 
          value={stats.gradeReports} 
          icon={BarChart3} 
          color="bg-slate-600" 
        />
        <StatCard 
          title="Study Materials" 
          value={stats.studyMaterials} 
          icon={BookOpen} 
          color="bg-gray-500" 
        />
        <StatCard 
          title="Timetables" 
          value={stats.timetables} 
          icon={Clock} 
          color="bg-gray-400" 
        />
        <StatCard 
          title="Users" 
          value={stats.users} 
          icon={Users} 
          color="bg-gray-300 text-gray-800" 
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Recent Announcements</h3>
          <div className="space-y-3">
            {recentAnnouncements.map(ann => (
              <div key={ann.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-700">{ann.title}</p>
                  <p className="text-sm text-gray-500">{ann.audience} • {ann.date}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  ann.type === 'exam' ? 'bg-red-100 text-red-700' :
                  ann.type === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {ann.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Upcoming Exams</h3>
          <div className="space-y-3">
            {upcomingExams.map(exam => (
              <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-700">{exam.module}</p>
                  <p className="text-sm text-gray-500">{exam.date} • {exam.time}</p>
                </div>
                <Calendar size={20} className="text-red-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = (title, items, createAction) => (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-700">{title}</h2>
        <div className="flex gap-2">
          <ActionButton 
            onClick={createAction} 
            icon={Plus} 
            label={`Add ${title.slice(0, -1)}`}
            color="bg-red-500"
          />
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <ActionButton 
          onClick={() => {}} 
          icon={Filter} 
          label="Filter"
          color="bg-slate-600"
        />
      </div>

      {/* Items List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title/Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.title || item.name}</div>
                    <div className="text-sm text-gray-500">{item.description || item.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const mockData = {
    announcements: [
      { title: 'Mid-term Results', description: 'Results are now available', date: '2025-05-29' },
      { title: 'Holiday Notice', description: 'Campus closed next Monday', date: '2025-05-28' },
      { title: 'New Course Registration', description: 'Registration opens June 1st', date: '2025-05-27' }
    ],
    examSchedules: [
      { title: 'Mathematics 101 Final', description: 'Room A101', date: '2025-06-05' },
      { title: 'Physics 201 Midterm', description: 'Room B203', date: '2025-06-07' },
      { title: 'Chemistry 301 Quiz', description: 'Room C105', date: '2025-06-10' }
    ],
    gradeReports: [
      { title: 'John Doe - Math 101', description: 'Grade: A-', date: '2025-05-25' },
      { title: 'Jane Smith - Physics 201', description: 'Grade: B+', date: '2025-05-24' },
      { title: 'Bob Johnson - Chemistry 301', description: 'Grade: A', date: '2025-05-23' }
    ],
    studyMaterials: [
      { title: 'Calculus Notes Chapter 5', description: 'PDF Document', date: '2025-05-20' },
      { title: 'Physics Lab Manual', description: 'Updated version', date: '2025-05-18' },
      { title: 'Chemistry Reference Sheet', description: 'Quick reference', date: '2025-05-15' }
    ],
    timetables: [
      { title: 'Week 12 Schedule', description: 'Regular classes', date: '2025-06-02' },
      { title: 'Exam Week Schedule', description: 'Final examinations', date: '2025-06-09' },
      { title: 'Summer Session', description: 'Special courses', date: '2025-06-16' }
    ],
    users: [
      { name: 'Alice Johnson', description: 'Student - CS Major', date: '2025-01-15' },
      { name: 'Prof. Smith', description: 'Faculty - Mathematics', date: '2024-08-20' },
      { name: 'Mike Wilson', description: 'Admin Staff', date: '2024-03-10' }
    ]
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'announcements':
        return renderSection('Announcements', mockData.announcements, () => alert('Create Announcement'));
      case 'exams':
        return renderSection('Exam Schedules', mockData.examSchedules, () => alert('Create Exam Schedule'));
      case 'grades':
        return renderSection('Grade Reports', mockData.gradeReports, () => alert('Create Grade Report'));
      case 'materials':
        return renderSection('Study Materials', mockData.studyMaterials, () => alert('Add Study Material'));
      case 'timetables':
        return renderSection('Timetables', mockData.timetables, () => alert('Create Timetable'));
      case 'users':
        return renderSection('Users', mockData.users, () => alert('Add User'));
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={24} />
              </div>
              <h1 className="text-xl font-bold text-slate-700">Teacher Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                T
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 py-4 overflow-x-auto">
            <TabButton 
              id="overview" 
              label="Overview" 
              icon={BarChart3} 
              active={activeTab === 'overview'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="announcements" 
              label="Announcements" 
              icon={Bell} 
              active={activeTab === 'announcements'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="exams" 
              label="Exams" 
              icon={Calendar} 
              active={activeTab === 'exams'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="grades" 
              label="Grades" 
              icon={FileText} 
              active={activeTab === 'grades'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="materials" 
              label="Materials" 
              icon={BookOpen} 
              active={activeTab === 'materials'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="timetables" 
              label="Timetables" 
              icon={Clock} 
              active={activeTab === 'timetables'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="users" 
              label="Users" 
              icon={Users} 
              active={activeTab === 'users'} 
              onClick={setActiveTab} 
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default TeacherDashboard;