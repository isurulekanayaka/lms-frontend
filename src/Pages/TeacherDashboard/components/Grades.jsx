import React, { useEffect, useState } from 'react';
import api from '../../../../api.js'; // Ensure this is your Axios instance

const Grades = () => {
    const [grades, setGrades] = useState([]);
    const [students, setStudents] = useState([]);
    const [modules, setModules] = useState([]);
    const [formData, setFormData] = useState({
        studentId: '',
        moduleId: '',
        date: '',
        grade: '',
        reportUrl: '',
        feedback: ''
    });
    const [editId, setEditId] = useState(null);

    // Fetch all grades
    const fetchGrades = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn('No auth token found');
                return;
            }
            const res = await api.get('/grade-report/all', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGrades(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchGrades();
        fetchStudents();
        fetchModules();
    }, []);

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await api.get('/student/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudents(res.data);
        } catch (err) {
            console.error('Error fetching students', err);
        }
    };

    const fetchModules = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get("/modules/all", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const fetchedModules = response.data.modules || response.data.Modules || [];
            setModules(Array.isArray(fetchedModules) ? fetchedModules : []);

        } catch (err) {
            console.error('Error fetching modules', err);
            setModules([]); // fallback on error
        }
    };


    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                const token = localStorage.getItem('token');
                // Update existing grade
                await api.put(`/grade-report/update/${editId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                const token = localStorage.getItem('token');
                // Add new grade
                await api.post('/grade-report/publish', formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            setFormData({
                studentId: '',
                moduleId: '',
                date: '',
                grade: '',
                reportUrl: '',
                feedback: ''
            });
            setEditId(null);
            fetchGrades();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error(err);
            alert('Error saving grade report');
        }
    };

    const handleEdit = (grade) => {
        setFormData({
            studentId: grade.studentId,
            moduleId: grade.moduleId,
            date: grade.date.slice(0, 10), // format for input[type=date]
            grade: grade.grade,
            reportUrl: grade.reportUrl,
            feedback: grade.feedback
        });
        setEditId(grade._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this grade report?')) return;

        try {
            await api.delete(`/grade-report/delete/${id}`);
            fetchGrades();
        } catch (err) {
            console.error(err);
            alert('Error deleting grade report');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
                {editId ? 'Edit Grade Report' : 'Publish Grade Report'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <select
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                >
                    <option value="">Select Student</option>
                    {students.map((student) => (
                        <option key={student._id} value={student._id}>
                            {student.name} ({student._id})
                        </option>
                    ))}
                </select>

                <select
                    name="moduleId"
                    value={formData.moduleId}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                >
                    <option value="">Select Module</option>
                    {modules.map((mod) => (
                        <option key={mod._id} value={mod._id}>{mod.moduleName}</option>
                    ))}
                </select>

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="grade"
                    placeholder="Grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="reportUrl"
                    placeholder="Report URL"
                    value={formData.reportUrl}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <textarea
                    name="feedback"
                    placeholder="Feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    className="p-2 border rounded md:col-span-2"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded md:col-span-2">
                    {editId ? 'Update Grade' : 'Publish Grade'}
                </button>
            </form>

            <h3 className="text-xl font-semibold mb-2">All Grade Reports</h3>

            <table className="w-full border text-left text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Student ID</th>
                        <th className="p-2 border">Module ID</th>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Grade</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.length > 0 ? (
                        grades.map((g) => (
                            <tr key={g._id} className="border-t">
                                <td className="p-2 border">
                                    {
                                        typeof g.studentId === 'object'
                                            ? students.find(s => s._id === g.studentId._id)?.name || g.studentId._id
                                            : students.find(s => s._id === g.studentId)?.name || g.studentId
                                    }
                                </td>
                                <td className="p-2 border">
                                    {
                                        typeof g.moduleId === 'object'
                                            ? modules.find(m => m._id === g.moduleId._id)?.name || g.moduleId._id
                                            : modules.find(m => m._id === g.moduleId)?.name || g.moduleId
                                    }
                                </td>


                                <td className="p-2 border">{new Date(g.date).toLocaleDateString()}</td>
                                <td className="p-2 border">{g.grade}</td>
                                <td className="p-2 border">
                                    <button onClick={() => handleEdit(g)} className="text-blue-600 hover:underline mr-2">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(g._id)} className="text-red-600 hover:underline">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center p-4">No grade reports found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Grades;
