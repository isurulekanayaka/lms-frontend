import React, { useState, useEffect } from 'react';
import api from '../../api';

const AddExamPopup = ({ onClose }) => {
  const [modules, setModules] = useState([]);
  const [formData, setFormData] = useState({
    moduleId: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No auth token found');
        return;
      }

      const response = await api.get('/modules/all', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedModules = response.data.modules || response.data.Modules || [];
      setModules(Array.isArray(fetchedModules) ? fetchedModules : []);
    } catch (error) {
      console.error('Error fetching Modules:', error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/exam-schedule/publish', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Exam scheduled successfully!');
      onClose();
    } catch (error) {
      console.error('Error creating exam:', error);
      alert('Failed to schedule exam.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
        <h3 className="text-xl font-bold mb-4">Schedule New Exam</h3>
        <form onSubmit={handleSubmit}>
          <select
            name="moduleId"
            value={formData.moduleId}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4"
            required
          >
            <option value="">Select Subject</option>
            {modules.map((mod) => (
              <option key={mod._id} value={mod._id}>
                {mod.moduleName}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4"
            required
          />
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4"
            required
          />
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4"
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExamPopup;
