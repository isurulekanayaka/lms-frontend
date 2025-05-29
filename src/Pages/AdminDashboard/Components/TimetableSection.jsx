import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import api from '../../../../api.js';
import AddTimeTableModal from '../../../Components/AddTimeTableModal.jsx';
import EditTimeTableModal from '../../../Components/EditTimeTableModal.jsx';

const TimetableSection = () => {
  const [timetables, setTimetables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTimetableId, setSelectedTimetableId] = useState(null);

  // Move fetchTimetable outside useEffect so other functions can use it
  const fetchTimetable = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/timetable/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTimetables(response.data);
    } catch (err) {
      console.error("Error fetching timetable:", err);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  // Pass timetableId as argument
  const handleView = (timetableId) => {
    setSelectedTimetableId(timetableId);
    setEditModalOpen(true);
  };


  const handleDelete = async (timetableId) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/timetable/delete/${timetableId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh timetable after delete
      fetchTimetable();
    } catch (error) {
      console.error('Error deleting timetable:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Timetable Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Schedule
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase font-medium">
            <tr>
              <th className="px-4 py-2">Module</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
              <th className="px-4 py-2">Note</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {timetables.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="px-4 py-2">{item.moduleId?.moduleName || 'N/A'}</td>
                <td className="px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{item.startTime}</td>
                <td className="px-4 py-2">{item.endTime}</td>
                <td className="px-4 py-2">{item.note || '-'}</td>
                <td className="px-4 py-2 flex gap-2">
                  {/* Pass ID here */}
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleView(item._id)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {timetables.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center px-4 py-4 text-gray-400">No schedule found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AddTimeTableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdded={fetchTimetable}
      />
      <EditTimeTableModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        timetableId={selectedTimetableId}
        onUpdated={fetchTimetable}
      />
    </div>
  );
};

export default TimetableSection;
