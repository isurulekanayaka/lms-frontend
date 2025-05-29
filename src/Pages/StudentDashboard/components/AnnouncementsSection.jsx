import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'react-feather';
import api from '../../../../api.js'; // adjust the path if needed
import AddAnnouncementModal from '../../../Components/AddAnnouncementModal.jsx';
import EditAnnouncementModal from '../../../Components/EditAnnouncementModal.jsx';

const AnnouncementsSection = () => {
  const [announcements, setAnnouncement] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);

  const fetchAnnouncement = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No auth token found');
        return;
      }
      const response = await api.get('/announcement/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncement(response.data);
    } catch (error) {
      console.error('Error fetching announcement:', error);
    }
  };
  const handleView = (announcementId) => {
    const selected = announcements.find(a => a._id === announcementId);
    setEditAnnouncement(selected);
  };


  useEffect(() => {
    fetchAnnouncement();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Announcements</h2>
       
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{announcement.title}</h3>
                <p className="text-gray-600 mb-4">{announcement.message}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Type: {announcement.type}</span>
                  <span>Audience: {announcement.audience}</span>
                  <span>Created: {new Date(announcement.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-900"
                  onClick={() => handleView(announcement._id)}
                >
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && <AddAnnouncementModal onClose={() => setShowModal(false)} />}
      {editAnnouncement && (
        <EditAnnouncementModal
          announcement={editAnnouncement}
          onClose={() => setEditAnnouncement(null)}
          onUpdate={() => {
            fetchAnnouncement();
            setEditAnnouncement(null);
          }}
        />
      )}

    </div>
  );
};

export default AnnouncementsSection;
