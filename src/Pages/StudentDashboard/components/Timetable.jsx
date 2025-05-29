import React, { useEffect, useState } from 'react';
import api from '../../../../api';

export default function Timetable() {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get('/timetable/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTimetables(response.data);
    } catch (err) {
      console.error('Error fetching timetable:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading timetable...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase font-semibold sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3">Module</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Start Time</th>
            <th className="px-4 py-3">End Time</th>
            <th className="px-4 py-3">Note</th>
          </tr>
        </thead>
        <tbody>
          {timetables.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center px-4 py-8 text-gray-400 italic">
                No schedule found
              </td>
            </tr>
          ) : (
            timetables.map((item, idx) => (
              <tr
                key={item._id}
                className={`border-t ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-200`}
              >
                <td className="px-4 py-3">{item.moduleId?.moduleName || 'N/A'}</td>
                <td className="px-4 py-3">{new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                <td className="px-4 py-3">{item.startTime}</td>
                <td className="px-4 py-3">{item.endTime}</td>
                <td className="px-4 py-3">{item.note || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
