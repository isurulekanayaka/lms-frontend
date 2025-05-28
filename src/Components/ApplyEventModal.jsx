import React, { useState, useEffect } from 'react';
import { X } from 'react-feather';
import api from '../../api'; // adjust path as needed

const ApplyEventModal = ({ eventId, onClose, onApplied }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [students, setStudents] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(eventId || '');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/announcement/search/type?type=event', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEvents(response.data);
            } catch (err) {
                console.error('Failed to fetch events', err);
            }
        };

        const fetchStudent = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/student/all', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStudents(response.data);
            } catch (err) {
                console.error('Failed to fetch students', err);
            }
        };

        fetchEvent();
        fetchStudent();
    }, []);

    const handleApply = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to apply.');
                setLoading(false);
                return;
            }

            await api.post('/event/create', {
                studentId: selectedStudent,
                eventId: selectedEvent,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setLoading(false);
            onApplied(); // Notify parent
            onClose();
        } catch (error) {
            console.error('Failed to apply for event. Please try again:', error);
            setError('Failed to apply for event. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-8 relative animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>

                {/* Modal Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Confirm Application</h2>

                {/* Student Select */}
                <label className="block mb-2 font-medium">Select Student</label>
                <select
                    name="studentId"
                    className="w-full mb-4 p-2 border rounded"
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                >
                    <option value="">-- Select Student --</option>
                    {students.map((student) => (
                        <option key={student._id} value={student._id}>
                            {student.user?.firstName || 'Unnamed Student'}
                        </option>
                    ))}
                </select>


                {/* Event Select */}
                <label className="block mb-2 font-medium">Select Event</label>
                <select
                    name="eventId"
                    className="w-full mb-4 p-2 border rounded"
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                >
                    <option value="">-- Select Event --</option>
                    {events.map((event) => (
                        <option key={event._id} value={event._id}>
                            {event.title}
                        </option>
                    ))}
                </select>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleApply}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                        disabled={loading || !selectedStudent || !selectedEvent}
                    >
                        {loading ? 'Applying...' : 'Apply'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplyEventModal;
