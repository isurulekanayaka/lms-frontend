import React, { useState, useEffect } from 'react';
import {
  Calendar, BookOpen, Bell, Clock, FileText, User, Home, Settings, X
} from 'lucide-react';
import api from '../../../api.js'; // adjust path as needed
import ModuleUi from '../StudentDashboard/components/Modules.jsx';
import TimetableUi from '../StudentDashboard/components/Timetable.jsx';
import AnnouncementsSection from '../StudentDashboard/components/AnnouncementsSection.jsx';
import Profile from '../StudentDashboard/components/Profile.jsx';

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

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

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'modules', label: 'Modules', icon: BookOpen },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    // { id: 'materials', label: 'Study Materials', icon: FileText },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const StatCard = ({ title, count, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 hover:shadow-lg transition-shadow" style={{ borderColor: color }}>
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

  const renderDashboard = () => (
    <div className="space-y-8 p-4">
      <div className="bg-gradient-to-r from-[#f74464] to-[#6a7285] text-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-3">Welcome back, Student!</h1>
        <p className="text-xl opacity-90">Ready to continue your learning journey?</p>
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

  const renderContentById = (id) => {
    switch (id) {
      case 'modules':
        return (
          <div className="p-10">
            <ModuleUi />
          </div>
        );
      case 'timetable':
        return (
          <div className="p-10">
            <TimetableUi/>
          </div>
        );
      case 'materials':
        return (
          <div className="p-10">
            <h2 className="text-3xl font-bold text-[#374258]">Study Materials</h2>
            <p className="text-[#6a7285] mt-2">Access study materials for your courses here.</p>
          </div>
        );
      case 'announcements':
        return (
          <div className="p-10">
            <AnnouncementsSection/>
          </div>
        );
      case 'profile':
        return (
          <div className="p-10">
            <Profile/>
          </div>
        );
      case 'settings':
        return (
          <div className="p-10">
            <h2 className="text-3xl font-bold text-[#374258]">Settings</h2>
            <p className="text-[#6a7285] mt-2">Configure your preferences and system settings.</p>
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

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transition-transform duration-300 ease-in-out z-50
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#374258]">Dashboard</h1>
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            {menuItems.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => {
                    setActiveTab(id);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 text-left hover:bg-[#f74464] hover:text-white transition-colors
                    ${activeTab === id ? 'bg-[#f74464] text-white' : 'text-[#374258]'}`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-h-screen md:ml-64 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white shadow p-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="text-[#374258]"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-[#374258]">Student Dashboard</h1>
          <div /> {/* Empty placeholder to keep spacing */}
        </header>

        {/* Page content */}
        <main className="flex-grow overflow-auto">
          {activeTab === 'dashboard' ? renderDashboard() : renderContentById(activeTab)}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
