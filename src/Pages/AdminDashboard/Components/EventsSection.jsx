import React from 'react';
import { Plus, Eye, Edit, Trash2 } from 'react-feather';

const EventsSection = () => {
  // Hardcoded sample events data
  const events = [
    {
      _id: 'e1',
      title: 'Annual Sports Day',
      eventType: 'Sports',
      description: 'A day full of athletic competitions and fun activities.',
      date: '2025-06-15',
      location: 'Main Stadium',
      maxParticipants: 200,
    },
    {
      _id: 'e2',
      title: 'Science Fair Competition',
      eventType: 'Competition',
      description: 'Students showcase their science projects and experiments.',
      date: '2025-07-10',
      location: 'Science Hall',
      maxParticipants: 50,
    },
    {
      _id: 'e3',
      title: 'Academic Workshop',
      eventType: 'Academic',
      description: 'A workshop on effective study techniques and exam preparation.',
      date: '2025-08-05',
      location: 'Lecture Room 3',
      maxParticipants: 30,
    },
    {
      _id: 'e4',
      title: 'Community Meetup',
      eventType: 'Other',
      description: 'Networking event for students and faculty.',
      date: '2025-09-01',
      location: 'Community Hall',
      maxParticipants: 100,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Events Management</h2>
        <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-slate-800">{event.title}</h3>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  event.eventType === 'Competition'
                    ? 'bg-red-100 text-red-800'
                    : event.eventType === 'Sports'
                    ? 'bg-blue-100 text-blue-800'
                    : event.eventType === 'Academic'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {event.eventType}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>Max Participants: {event.maxParticipants}</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="text-slate-600 hover:text-slate-900">
                <Eye className="h-4 w-4" />
              </button>
              <button className="text-blue-600 hover:text-blue-900">
                <Edit className="h-4 w-4" />
              </button>
              <button className="text-red-600 hover:text-red-900">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
