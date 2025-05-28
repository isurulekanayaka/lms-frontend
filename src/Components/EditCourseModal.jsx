import React, { useEffect, useState } from 'react';
import api from '../../api';

const EditCourseModal = ({ courseId, onClose, onSave }) => {
  const [courseName, setCourseName] = useState('');
  const [courseDirector, setCourseDirector] = useState('');
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseAndLecturers = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch course data
        const courseResponse = await api.get(`/courses/id/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const course = courseResponse.data;
        setCourseName(course.courseName || '');
        setCourseDirector(course.courseDirector?._id || '');

        // Fetch lecturers for select dropdown
        const lecturersResponse = await api.get('/user/by-role?role=lecture', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLecturers(lecturersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course or lecturers:', error);
        setLoading(false);
      }
    };

    fetchCourseAndLecturers();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.put(
        `/courses/update/${courseId}`,
        { courseName, courseDirector },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSave();  // Notify parent to refresh the list
      onClose();
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Course Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />

            <label className="block text-sm font-medium mb-1 mt-4">Course Director</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={courseDirector}
              onChange={(e) => setCourseDirector(e.target.value)}
              required
            >
              <option value="">Select a Lecturer</option>
              {lecturers.map((lecturer) => (
                <option key={lecturer._id} value={lecturer._id}>
                  {lecturer.firstName} {lecturer.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;
