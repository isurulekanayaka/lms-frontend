import React, { useState } from 'react';
import api from '../../api';

const AddAnnouncementModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        type: 'announcement',
        audience: '',
        date: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn('No auth token found');
                return;
            }

            await api.post('/announcement/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Announcement created:', formData);
            onClose(); // close modal after submission
        } catch (error) {
            console.error('Error creating announcement:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">New Announcement</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full mb-3 p-2 border rounded"
                        required
                    />

                    <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full mb-3 p-2 border rounded"
                        required
                    ></textarea>

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full mb-3 p-2 border rounded"
                    >
                        <option value="announcement">Announcement</option>
                        <option value="reminder">Event</option>
                        <option value="event">Reminder</option>
                    </select>

                    <select
                        name="audience"
                        value={formData.audience}
                        onChange={handleChange}
                        className="w-full mb-3 p-2 border rounded"
                        required
                    >
                        <option value="">Select Audience</option>
                        <option value="all">All</option>
                        <option value="students">Students</option>
                        <option value="lectures">Lectures</option>
                        <option value="parents">Parents</option>
                    </select>

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border rounded"
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="bg-gray-300 px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAnnouncementModal;
