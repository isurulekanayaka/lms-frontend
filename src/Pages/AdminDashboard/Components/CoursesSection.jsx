import React from 'react';
import { Plus, Edit, Trash2 } from 'react-feather';

const CoursesSection = () => {
  // Hardcoded sample courses data
  const courses = [
    {
      _id: '1',
      courseName: 'Introduction to React',
      courseDirector: { firstName: 'Alice', lastName: 'Johnson' },
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      _id: '2',
      courseName: 'Advanced JavaScript',
      courseDirector: { firstName: 'Bob', lastName: 'Smith' },
      createdAt: '2024-02-20T12:30:00Z',
    },
    {
      _id: '3',
      courseName: 'UI/UX Design Basics',
      courseDirector: { firstName: 'Charlie', lastName: 'Brown' },
      createdAt: '2024-03-10T09:15:00Z',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Courses Management</h2>
        <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{course.courseName}</h3>
            <p className="text-gray-600 mb-4">
              Director: {course.courseDirector?.firstName} {course.courseDirector?.lastName}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Created: {new Date(course.createdAt).toLocaleDateString()}
              </span>
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

export default CoursesSection;
