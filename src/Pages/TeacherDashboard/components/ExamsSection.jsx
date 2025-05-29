import React, { useEffect, useState } from 'react';
import api from '../../../../api.js';
import { Plus, Eye, Edit, Trash2 } from 'react-feather';
import AddExamPopup from '../../../Components/AddExamPopup.jsx';

const ExamsSection = () => {
  const [exams, setExams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modules, setModules] = useState([]);
  const [formData, setFormData] = useState({
    subject: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    fetchExams();
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

  
    const handleDelete = async (examId) => {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/exam-schedule/delete/${examId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchExams();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };

  const fetchExams = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return console.warn('No auth token found');
      const { data } = await api.get('/exam-schedule/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExams(data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setSelectedExam(null);
    setIsEditMode(false);
  };

  const handleView = async (examId, mode) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await api.get(`/exam-schedule/id/${examId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSelectedExam(data);

      if (mode === 'edit') {
        setFormData({
          subject: data.moduleId?._id || '', // This sets the default selected subject
          date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
          startTime: data.startTime || '',
          endTime: data.endTime || '',
        });
        setIsEditMode(true);
      }

      setShowModal(true);
    } catch (error) {
      console.error('Error fetching exam:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.put(
        `/exam-schedule/update/${selectedExam._id}`,
        {
          moduleId: formData.subject,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      closeModal();
      fetchExams();
    } catch (error) {
      console.error('Error updating exam:', error);
      alert('Failed to update exam.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Exams Schedule</h2>
        <button
          onClick={openModal}
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Schedule Exam
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {['Subject', 'Date', 'Start Time', 'End Time', 'Actions'].map((head) => (
                <th key={head} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exams.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center px-6 py-4 text-gray-500">No exams scheduled.</td>
              </tr>
            ) : (
              exams.map((exam) => (
                <tr key={exam._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 text-center">
                    {exam.moduleId?.moduleName || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">
                    {new Date(exam.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">{exam.startTime}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">{exam.endTime}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleView(exam._id, 'view')}><Eye className="h-4 w-4" /></button>
                      <button onClick={() => handleView(exam._id, 'edit')}><Edit className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(exam._id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Exam Modal */}
      {showModal && !selectedExam && <AddExamPopup onClose={closeModal} />}

      {/* View/Edit Modal */}
      {showModal && selectedExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit Exam' : 'Exam Details'}</h2>

            {isEditMode ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select Subject</option>
                    {modules.map((mod) => (
                      <option key={mod._id} value={mod._id}>
                        {mod.moduleName}
                      </option>
                    ))}
                  </select>


                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, startTime: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, endTime: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Close</button>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded">
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3 text-gray-700">
                <p><strong>Subject:</strong> {selectedExam.moduleId?.moduleName || 'N/A'}</p>
                <p><strong>Date:</strong> {new Date(selectedExam.date).toLocaleDateString()}</p>
                <p><strong>Start Time:</strong> {selectedExam.startTime}</p>
                <p><strong>End Time:</strong> {selectedExam.endTime}</p>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Close</button>
                  <button onClick={() => setIsEditMode(true)} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded">Edit</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamsSection;
