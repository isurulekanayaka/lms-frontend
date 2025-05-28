import React, { useState } from 'react';
import DashboardOverview from './Components/DashboardOverview';
import UsersSection from './Components/UsersSection';
import CoursesSection from './Components/CoursesSection';
import AnnouncementsSection from './Components/AnnouncementsSection';
import EventsSection from './Components/EventsSection';
import ExamsSection from './Components/ExamsSection';
import PaymentsSection from './Components/PaymentsSection';
import TimetableSection from './Components/TimetableSection';
import { BookOpen, Users, Bell, Calendar, FileText, DollarSign, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || '{}');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'exams', label: 'Exams', icon: FileText },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'timetable', label: 'Timetable', icon: Clock },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview />;
      case 'users': return <UsersSection />;
      case 'courses': return <CoursesSection />;
      case 'announcements': return <AnnouncementsSection />;
      case 'events': return <EventsSection />;
      case 'exams': return <ExamsSection />;
      case 'payments': return <PaymentsSection />;
      case 'timetable': return <TimetableSection />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-slate-800 text-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-slate-300 text-sm mt-1">SchoolMate</p>
        </div>
        <nav className="mt-6">
          {sidebarItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-slate-700 transition-colors ${activeTab === id ? 'bg-slate-700 border-r-4 border-red-400' : ''}`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 capitalize">
                {activeTab === 'dashboard' ? 'Dashboard' : activeTab}
              </h2>
              <p className="text-gray-600 text-sm">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-400" />
                <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {announcements.length}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{user?.firstName}</p>
                  <p className="text-xs text-gray-600">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400"></div>
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
