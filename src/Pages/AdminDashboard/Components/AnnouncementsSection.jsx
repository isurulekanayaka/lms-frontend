import React from 'react';
import { Plus, Edit, Trash2 } from 'react-feather';

const AnnouncementsSection = () => {
  // Hardcoded sample announcements data
  const announcements = [
    {
      _id: 'a1',
      title: 'System Maintenance',
      message: 'The system will be down for maintenance on May 30th from 12 AM to 4 AM.',
      type: 'Maintenance',
      audience: 'All Users',
      createdAt: '2025-05-25T08:00:00Z',
    },
    {
      _id: 'a2',
      title: 'New Feature Release',
      message: 'We have released a new dashboard feature to improve your experience.',
      type: 'Update',
      audience: 'Premium Users',
      createdAt: '2025-05-20T10:30:00Z',
    },
    {
      _id: 'a3',
      title: 'Holiday Notice',
      message: 'Office will be closed on June 5th for the national holiday.',
      type: 'Notice',
      audience: 'Employees',
      createdAt: '2025-05-22T14:45:00Z',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Announcements</h2>
        <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Announcement
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{announcement.title}</h3>
                <p className="text-gray-600 mb-4">{announcement.message}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Type: {announcement.type}</span>
                  <span>Audience: {announcement.audience}</span>
                  <span>Created: {new Date(announcement.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsSection;
