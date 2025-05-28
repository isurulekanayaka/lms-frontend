import React, { useState, useEffect } from 'react';
import api from '../../api';

const EditAnnouncementModal = ({ announcement, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'announcement',
    audience: '',
    date: '',
  });

  useEffect(() => {
    if (announcement) {
      setFormData({
        title: announcement.title || '',
        message: announcement.message || '',
        type: announcement.type || 'announcement',
        audience: announcement.audience || '',
        date: announcement.date ? announcement.date.substring(0, 10) : '',
      });
    }
  }, [announcement]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No auth token found');
        return;
      }

      await api.put(`/announcement/update/${announcement._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onUpdate();  // Refresh list
      onClose();   // Close modal
    } catch (error) {
      console.error('Error updating announcement:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Announcement</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <input
            type="text"
            name="type"
            placeholder="Type (e.g., announcement)"
            value={formData.type}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <select
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          >
            <option value="">Select Audience</option>
            <option value="all">All</option>
            <option value="students">Students</option>
            <option value="lectures">Lectures</option>
            <option value="parents">Parents</option>
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAnnouncementModal;
