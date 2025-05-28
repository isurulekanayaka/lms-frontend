import React from 'react';
import { Plus, Eye, Edit, Trash2 } from 'react-feather';

const ExamsSection = () => {
  // Hardcoded sample exams data
  const exams = [
    {
      _id: 'ex1',
      title: 'Midterm Exam',
      subject: 'Mathematics',
      date: '2025-07-10',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      venue: 'Room A1',
    },
    {
      _id: 'ex2',
      title: 'Final Exam',
      subject: 'Physics',
      date: '2025-07-15',
      startTime: '1:00 PM',
      endTime: '3:00 PM',
      venue: 'Room B2',
    },
    {
      _id: 'ex3',
      title: 'Practical Exam',
      subject: 'Chemistry Lab',
      date: '2025-07-18',
      startTime: '9:00 AM',
      endTime: '11:00 AM',
      venue: 'Lab C3',
    },
    {
      _id: 'ex4',
      title: 'Quiz',
      subject: 'English Literature',
      date: '2025-07-20',
      startTime: '11:00 AM',
      endTime: '11:45 AM',
      venue: 'Room D4',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Exams Schedule</h2>
        <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Schedule Exam
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exams.map((exam) => (
              <tr key={exam._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {exam.startTime} - {exam.endTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.venue}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamsSection;
