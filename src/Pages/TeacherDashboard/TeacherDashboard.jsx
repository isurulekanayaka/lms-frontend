import React, { useState, useEffect } from 'react';
import AddAnnouncement from '../TeacherDashboard/components/AnnouncementsSection.jsx';
import ExamsSection from '../TeacherDashboard/components/ExamsSection.jsx';
import Grades from '../TeacherDashboard/components/Grades.jsx';
import Timetable from '../TeacherDashboard/components/TimetableSection.jsx';
import UsersSection from '../TeacherDashboard/components/UsersSection.jsx';
import {
  Calendar, BookOpen, Bell, Clock, FileText, User, Home, Settings, X,
  BarChart3, Users
} from 'lucide-react';
import api from '../../../api.js'; // adjust path as needed

// TabButton component for navigation tabs
const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition ${active ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-100'
      }`}
  >
    <Icon className="w-5 h-5" />
    {label}
  </button>
);

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [modules, setModules] = useState([]);
  const [studyMaterials, setStudyMaterials] = useState([]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No auth token found');
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  };

  const fetchData = async (endpoint, setter) => {
    const headers = getAuthHeaders();
    if (!headers) return;
    try {
      const response = await api.get(endpoint, { headers });
      setter(response.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    fetchData('/announcement/search/type?type=announcement', setAnnouncements);
    fetchData('/announcement/search/type?type=event', setEvents);
    fetchData('/modules/all', setModules);
    fetchData('/study-materials/all', setStudyMaterials);
  }, []);

  const getAnnouncementColor = (type) => {
    switch (type) {
      case 'urgent': return 'bg-red-500';
      case 'important': return 'bg-orange-500';
      default: return 'bg-blue-500';
    }
  };

  // Render the Overview tab content
  const renderOverview = () => (
    <div className="space-y-8 p-4">
      <div className="bg-gradient-to-r from-[#f74464] to-[#6a7285] text-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-3">Welcome back, Teacher!</h1>
        <p className="text-xl opacity-90">Here’s an overview of your teaching activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Modules" count={modules.length} icon={BookOpen} color="#f74464" />
        <StatCard title="Upcoming Events" count={events.length} icon={Calendar} color="#374258" />
        <StatCard title="Study Materials" count={studyMaterials.length} icon={FileText} color="#6a7285" />
        <StatCard title="New Announcements" count={announcements.length} icon={Bell} color="#f74464" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <SectionHeader icon={Bell} title="Recent Announcements" color="#f74464" />
          <div className="space-y-4">
            {announcements.slice(0, 3).map((announcement, index) => (
              <div key={announcement.id || index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border-l-4 border-transparent hover:border-[#f74464]">
                <div className={`w-4 h-4 rounded-full ${getAnnouncementColor(announcement.type)} mt-1`} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#374258] mb-1">{announcement.title}</h4>
                  <p className="text-sm text-[#6a7285] mb-2">{announcement.message}</p>
                  <p className="text-xs text-[#c4c4c4]">{announcement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <SectionHeader icon={Calendar} title="Upcoming Events" color="#374258" />
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={event.id || index} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-[#f74464] text-white p-3 rounded-xl flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#374258] mb-1">{event.title}</h4>
                  <p className="text-sm text-[#6a7285]">
                    {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <span className="text-xs bg-[#f3f3f3] text-[#6a7285] px-3 py-1 rounded-full">{event.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'announcements':
        return (
          <div className="p-10">
            <AddAnnouncement />
          </div>
        );
      case 'exams':
        return (
          <div className="p-10">
            <ExamsSection/>
          </div>
        );
      case 'grades':
        return (
          <div className="p-10">
            <Grades/>
          </div>
        );
      case 'materials':
        return (
          <div className="p-10">
            <h2 className="text-3xl font-bold text-[#374258]">Materials</h2>
            <p className="text-[#6a7285] mt-2">Access your study materials here.</p>
          </div>
        );
      case 'timetables':
        return (
          <div className="p-10">
            <Timetable/>
          </div>
        );
      case 'users':
        return (
          <div className="p-10">
            <UsersSection/>
          </div>
        );
      default:
        return (
          <div className="p-10">
            <h2 className="text-3xl font-bold text-[#374258]">Welcome</h2>
          </div>
        );
    }
  };

  const StatCard = ({ title, count, icon: Icon, color }) => (
    <div
      className="bg-white p-6 rounded-xl shadow-md border-l-4 hover:shadow-lg transition-shadow"
      style={{ borderColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#6a7285] text-sm font-medium uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-[#374258] mt-2">{count}</p>
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}1A` }}>
          <Icon className="w-8 h-8" style={{ color }} />
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({ icon: Icon, title, color }) => (
    <h3 className="text-xl font-bold text-[#374258] mb-6 flex items-center">
      <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: `${color}1A` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      {title}
    </h3>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#374258]">Teacher Dashboard</h1>
        <div className="flex space-x-6 text-[#374258]">
          <Bell className="w-5 h-5 cursor-pointer" />
          <User className="w-5 h-5 cursor-pointer" />
          <Settings className="w-5 h-5 cursor-pointer" />
          <X className="w-5 h-5 cursor-pointer" />
        </div>
      </div>

      {/* Tabs */}
      <nav className="flex space-x-3 px-6 py-4 bg-white shadow-inner sticky top-[56px] z-10 overflow-x-auto">
        <TabButton id="overview" label="Overview" icon={Home} active={activeTab === 'overview'} onClick={setActiveTab} />
        <TabButton id="announcements" label="Announcements" icon={Bell} active={activeTab === 'announcements'} onClick={setActiveTab} />
        <TabButton id="exams" label="Exams" icon={Clock} active={activeTab === 'exams'} onClick={setActiveTab} />
        <TabButton id="grades" label="Grades" icon={BarChart3} active={activeTab === 'grades'} onClick={setActiveTab} />
        {/* <TabButton id="materials" label="Materials" icon={BookOpen} active={activeTab === 'materials'} onClick={setActiveTab} /> */}
        <TabButton id="timetables" label="Timetables" icon={Calendar} active={activeTab === 'timetables'} onClick={setActiveTab} />
        <TabButton id="users" label="Users" icon={Users} active={activeTab === 'users'} onClick={setActiveTab} />
      </nav>

      {/* Content */}
      <main className="p-6">{renderContent()}</main>
    </div>
  );
};

export default StudentDashboard;
