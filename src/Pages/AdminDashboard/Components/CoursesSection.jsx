import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'react-feather';
import api from '../../../../api.js'; // Adjust as needed
import AddCourseModal from '../../../Components/AddCourseModal.jsx'; // adjust path as needed
import EditCourseModal from '../../../Components/EditCourseModal.jsx'; // Import new modal

const CoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No auth token found');
        return;
      }
      const response = await api.get('/courses/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching Courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/courses/delete/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCourses();
    } catch (error) {
      console.error('Error deleting Course:', error);
    }
  };

  const handleView = (courseId) => {
    setEditCourseId(courseId);
  };

  const closeEditModal = () => {
    setEditCourseId(null);
  };

  const onSaveEdit = () => {
    fetchCourses();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Courses Management</h2>
        <button
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4" />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              {course.courseName}
            </h3>
            <p className="text-gray-600 mb-4">
              Director: {course.courseDirector?.firstName} {course.courseDirector?.lastName}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Created: {new Date(course.createdAt).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <button
                  className="text-blue-600 hover:text-blue-900"
                  onClick={() => handleView(course._id)}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDelete(course._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && <AddCourseModal onClose={() => setShowAddModal(false)} />}

      {editCourseId && (
        <EditCourseModal
          courseId={editCourseId}
          onClose={closeEditModal}
          onSave={onSaveEdit}
        />
      )}
    </div>
  );
};

export default CoursesSection;
