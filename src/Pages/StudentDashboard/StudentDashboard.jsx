import React, { useState } from 'react';
import { Calendar, BookOpen, Bell, Clock, FileText, Users, Search, Menu, X, Home, Settings, User } from 'lucide-react';

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data
  const announcements = [
    { id: 1, title: "Midterm Exam Schedule", message: "Midterm exams will begin next week. Please check your timetable.", type: "important", date: "2025-05-28" },
    { id: 2, title: "Library Hours Extended", message: "Library will be open until 10 PM during exam period.", type: "info", date: "2025-05-27" },
    { id: 3, title: "Assignment Deadline", message: "Database Systems assignment due tomorrow at 11:59 PM.", type: "urgent", date: "2025-05-26" }
  ];

  const events = [
    { id: 1, title: "Database Systems Lecture", date: "2025-05-29", time: "09:00 AM", type: "lecture" },
    { id: 2, title: "Web Development Workshop", date: "2025-05-30", time: "02:00 PM", type: "workshop" },
    { id: 3, title: "Study Group Meeting", date: "2025-05-31", time: "04:00 PM", type: "study" }
  ];

  const modules = [
    { id: 1, name: "Database Systems", course: "Computer Science", progress: 75 },
    { id: 2, name: "Web Development", course: "Computer Science", progress: 60 },
    { id: 3, name: "Data Structures", course: "Computer Science", progress: 90 },
    { id: 4, name: "Software Engineering", course: "Computer Science", progress: 45 }
  ];

  const studyMaterials = [
    { id: 1, title: "Database Design Principles", module: "Database Systems", type: "PDF" },
    { id: 2, title: "React Fundamentals", module: "Web Development", type: "Video" },
    { id: 3, title: "Algorithm Analysis", module: "Data Structures", type: "PDF" },
    { id: 4, title: "UML Diagrams Guide", module: "Software Engineering", type: "Document" }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'modules', label: 'Modules', icon: BookOpen },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'materials', label: 'Study Materials', icon: FileText },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getAnnouncementColor = (type) => {
    switch (type) {
      case 'urgent': return 'bg-red-500';
      case 'important': return 'bg-orange-500';
      default: return 'bg-blue-500';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#f74464] to-[#6a7285] text-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-3">Welcome back, Student!</h1>
        <p className="text-xl opacity-90">Ready to continue your learning journey?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#f74464] hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6a7285] text-sm font-medium uppercase tracking-wide">Active Modules</p>
              <p className="text-3xl font-bold text-[#374258] mt-2">{modules.length}</p>
            </div>
            <div className="bg-[#f74464] bg-opacity-10 p-3 rounded-lg">
              <BookOpen className="text-[#f74464] w-8 h-8" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#374258] hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6a7285] text-sm font-medium uppercase tracking-wide">Upcoming Events</p>
              <p className="text-3xl font-bold text-[#374258] mt-2">{events.length}</p>
            </div>
            <div className="bg-[#374258] bg-opacity-10 p-3 rounded-lg">
              <Calendar className="text-[#374258] w-8 h-8" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#6a7285] hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6a7285] text-sm font-medium uppercase tracking-wide">Study Materials</p>
              <p className="text-3xl font-bold text-[#374258] mt-2">{studyMaterials.length}</p>
            </div>
            <div className="bg-[#6a7285] bg-opacity-10 p-3 rounded-lg">
              <FileText className="text-[#6a7285] w-8 h-8" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#f74464] hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6a7285] text-sm font-medium uppercase tracking-wide">New Announcements</p>
              <p className="text-3xl font-bold text-[#374258] mt-2">{announcements.length}</p>
            </div>
            <div className="bg-[#f74464] bg-opacity-10 p-3 rounded-lg">
              <Bell className="text-[#f74464] w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Announcements & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-[#374258] mb-6 flex items-center">
            <div className="bg-[#f74464] bg-opacity-10 p-2 rounded-lg mr-3">
              <Bell className="text-[#f74464] w-5 h-5" />
            </div>
            Recent Announcements
          </h3>
          <div className="space-y-4">
            {announcements.slice(0, 3).map(announcement => (
              <div key={announcement.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border-l-4 border-transparent hover:border-[#f74464]">
                <div className={`w-4 h-4 rounded-full ${getAnnouncementColor(announcement.type)} mt-1 flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#374258] mb-1">{announcement.title}</h4>
                  <p className="text-sm text-[#6a7285] mb-2 leading-relaxed">{announcement.message}</p>
                  <p className="text-xs text-[#c4c4c4]">{announcement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-[#374258] mb-6 flex items-center">
            <div className="bg-[#374258] bg-opacity-10 p-2 rounded-lg mr-3">
              <Calendar className="text-[#374258] w-5 h-5" />
            </div>
            Upcoming Events
          </h3>
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-[#f74464] text-white p-3 rounded-xl flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#374258] mb-1">{event.title}</h4>
                  <p className="text-sm text-[#6a7285]">{event.date} at {event.time}</p>
                </div>
                <span className="text-xs bg-[#f3f3f3] text-[#6a7285] px-3 py-1 rounded-full">{event.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Module Progress */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-[#374258] mb-4 flex items-center">
          <BookOpen className="mr-2 text-[#f74464]" />
          Module Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map(module => (
            <div key={module.id} className="p-4 border border-[#f3f3f3] rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-[#374258]">{module.name}</h4>
                <span className="text-sm text-[#6a7285]">{module.progress}%</span>
              </div>
              <div className="w-full bg-[#f3f3f3] rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#f74464] to-[#6a7285] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-[#c4c4c4] mt-1">{module.course}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'modules':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#374258] mb-6">My Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map(module => (
                <div key={module.id} className="border border-[#f3f3f3] rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-[#374258] text-lg mb-2">{module.name}</h3>
                  <p className="text-[#6a7285] mb-4">{module.course}</p>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <div className="w-full bg-[#f3f3f3] rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#f74464] to-[#6a7285] h-2 rounded-full"
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-[#f74464] text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'materials':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#374258] mb-6">Study Materials</h2>
            <div className="space-y-4">
              {studyMaterials.map(material => (
                <div key={material.id} className="flex items-center justify-between p-4 border border-[#f3f3f3] rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <FileText className="text-[#f74464] w-6 h-6" />
                    <div>
                      <h3 className="font-semibold text-[#374258]">{material.title}</h3>
                      <p className="text-sm text-[#6a7285]">{material.module}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs bg-[#f3f3f3] text-[#6a7285] px-2 py-1 rounded">{material.type}</span>
                    <button className="text-[#f74464] hover:underline">Download</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#374258] transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 bg-[#374258]">
          <h2 className="text-xl font-bold text-white">Student Portal</h2>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-8">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-[#6a7285] transition-colors ${
                activeTab === item.id ? 'bg-[#6a7285] border-r-4 border-[#f74464]' : 'text-gray-300'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-[#f3f3f3]">
          <div className="flex items-center justify-between px-4 py-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#374258]">
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6a7285] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-[#c4c4c4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f74464] focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#f74464] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#374258] font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
};

export default StudentDashboard;