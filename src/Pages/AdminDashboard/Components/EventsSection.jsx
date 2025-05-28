import React, { useEffect, useState } from 'react';
import api from '../../../../api.js'; // adjust path if needed
import { Plus, Eye, Edit, Trash2 } from 'react-feather';
import ApplyEventModal from '../../../Components/ApplyEventModal.jsx'; // adjust path

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No auth token found');
        return;
      }
      const response = await api.get('/event/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
      console.log(response.data);

    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/event/id/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const onApplied = () => {
    alert('Applied successfully!');
    fetchEvents(); // optional: refresh events or applications
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Apply Events</h2>
        <button
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={() => {
            setSelectedEventId(null); // or set to a new ID if applicable
            setShowApplyModal(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Apply Event
        </button>

      </div>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Event Title</th>
            <th className="border border-gray-300 px-4 py-2">Event Date</th>
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2">Student Email</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">No event applications available</td>
            </tr>
          ) : (
            events.map((eventApply) => (
              <tr key={eventApply._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {eventApply.eventId?.title || 'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {eventApply.eventId?.date
                    ? new Date(eventApply.eventId.date).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {eventApply.studentId?.user?.firstName || 'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {eventApply.studentId?.user?.email || 'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(eventApply._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showApplyModal && (
        <ApplyEventModal
          eventId={selectedEventId}
          onClose={() => setShowApplyModal(false)}
          onApplied={onApplied}
        />
      )}
    </div>
  );
};

export default EventsSection;
