import React, { useState, useEffect } from 'react';
import api from '../../api';

const AddCourseModal = ({ onClose }) => {
    const [lecturers, setLecturers] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [courseDirector, setCourseDirector] = useState('');

    useEffect(() => {
        const fetchLecturers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/user/by-role?role=lecture', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLecturers(response.data);
            } catch (err) {
                console.error('Failed to fetch lecturers', err);
            }
        };
        fetchLecturers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!courseName || !courseDirector) {
            alert('Please fill in all fields');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            await api.post(
                '/courses/add',
                { courseName, courseDirector },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Course added successfully!');
            onClose();
        } catch (error) {
            console.error('Failed to add course', error);
            alert('Failed to add course');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
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
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCourseModal;
