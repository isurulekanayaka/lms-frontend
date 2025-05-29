import React, { useEffect, useState } from 'react';
import api from '../../../../api.js';

export default function ModuleSection() {
    const [modules, setModules] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newModuleName, setNewModuleName] = useState('');
    const [newCourseId, setNewCourseId] = useState('');
    const [editingModuleId, setEditingModuleId] = useState(null);
    const [editingModuleName, setEditingModuleName] = useState('');

    // Fetch all modules
    const fetchModules = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);
        try {
            const res = await api.get('/modules/all', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Modules response data:', res.data);
            setModules(res.data.modules);  // <-- pick the array property here
        } catch (error) {
            console.error('Error fetching modules:', error);
            alert('Failed to fetch modules');
        }
        setLoading(false);
    };

    // Fetch courses for dropdown
    const fetchCourses = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.warn('No auth token found');
            return;
        }
        try {
            const response = await api.get('/courses/all', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCourses(response.data.courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchModules();
        fetchCourses();
    }, []);

    // Create a new module
    const handleCreate = async () => {
        if (!newCourseId.trim() || !newModuleName.trim()) {
            alert('Please select a course and enter a module name');
            return;
        }
        const token = localStorage.getItem('token');
        try {
            const res = await api.post('/modules/add', {
                courseId: newCourseId,
                moduleName: newModuleName,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setModules([...modules, res.data]);
            setNewModuleName('');
            setNewCourseId('');
        } catch (error) {
            console.error('Error creating module:', error);
            alert('Failed to create module');
        }
    };

    // Start editing a module
    const startEditing = (module) => {
        setEditingModuleId(module._id);
        setEditingModuleName(module.moduleName);
    };

    // Cancel editing
    const cancelEditing = () => {
        setEditingModuleId(null);
        setEditingModuleName('');
    };

    // Save edited module
    const saveEdit = async () => {
        if (!editingModuleName.trim()) {
            alert('Module Name cannot be empty');
            return;
        }
        const token = localStorage.getItem('token');
        try {
            const res = await api.put(`/modules/update/${editingModuleId}`, {
                moduleName: editingModuleName,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setModules(modules.map(m => (m._id === editingModuleId ? res.data : m)));
            cancelEditing();
        } catch (error) {
            console.error('Error updating module:', error);
            alert('Failed to update module');
        }
    };

    // Delete a module
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this module?')) return;
        const token = localStorage.getItem('token');
        try {
            await api.delete(`/modules/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setModules(modules.filter(m => m._id !== id));
        } catch (error) {
            console.error('Error deleting module:', error);
            alert('Failed to delete module');
        }
    };

    // Helper: Find course name by id (for display in table)
    const getCourseName = (courseId) => {
        const course = courses.find(c => c._id === courseId);
        return course ? course.name || course.title || 'Unnamed Course' : 'Unknown Course';
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Modules Management</h3>

            {/* Create Module */}
            <div className="mb-6 flex gap-3 items-center">
                <select
                    value={newCourseId}
                    onChange={e => setNewCourseId(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                        <option key={course._id} value={course._id}>
                            {course.courseName || course.title}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Module Name"
                    value={newModuleName}
                    onChange={e => setNewModuleName(e.target.value)}
                    className="border rounded px-3 py-2 flex-1"
                />
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Add
                </button>
            </div>

            {/* Modules List */}
            {loading ? (
                <div>Loading modules...</div>
            ) : (
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Course</th>
                            <th className="border border-gray-300 px-4 py-2">Module Name</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modules.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center py-4">
                                    No modules found.
                                </td>
                            </tr>
                        )}
                        {modules.map(module => (
                            <tr key={module._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{getCourseName(module.courseId)}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editingModuleId === module._id ? (
                                        <input
                                            type="text"
                                            value={editingModuleName}
                                            onChange={e => setEditingModuleName(e.target.value)}
                                            className="border px-2 py-1 w-full"
                                        />
                                    ) : (
                                        module.moduleName
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 space-x-2">
                                    {editingModuleId === module._id ? (
                                        <>
                                            <button
                                                onClick={saveEdit}
                                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEditing}
                                                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => startEditing(module)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(module._id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
