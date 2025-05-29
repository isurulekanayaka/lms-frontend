import React, { useEffect, useState } from "react";
import api from "../../api";

const EditTimeTableModal = ({ isOpen, onClose, timetableId, onUpdated }) => {
    const [modules, setModules] = useState([]);
    const [formData, setFormData] = useState({
        moduleId: "",
        date: "",
        startTime: "",
        endTime: "",
        note: "",
    });

    const fetchModules = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("/modules/all", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const fetchedModules = response.data.modules || response.data.Modules || [];
            setModules(Array.isArray(fetchedModules) ? fetchedModules : []);
        } catch (error) {
            console.error("Error fetching Modules:", error);
        }
    };

    const fetchTimetableDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get(`/timetable/id/${timetableId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { moduleId, date, startTime, endTime, note } = response.data;
            setFormData({ moduleId, date, startTime, endTime, note });
        } catch (error) {
            console.error("Error fetching timetable details:", error);
        }
    };

    useEffect(() => {
        if (isOpen && timetableId) {
            fetchModules();
            fetchTimetableDetails();
        }
    }, [isOpen, timetableId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            await api.put(`/timetable/update/${timetableId}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onUpdated(); // Refresh parent
            onClose();   // Close modal
        } catch (error) {
            console.error("Error updating timetable:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Edit Schedule</h2>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Module</label>
                    <select name="moduleId" value={formData.moduleId} onChange={handleChange} className="w-full border rounded px-3 py-2">
                        <option value="">Select Module</option>
                        {modules.map((mod) => (
                            <option key={mod._id} value={mod._id}>{mod.moduleName}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                </div>

                <div className="mb-4 flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">Start Time</label>
                        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">End Time</label>
                        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Note</label>
                    <textarea name="note" value={formData.note} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                </div>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                    <button onClick={handleUpdate} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">Update</button>
                </div>
            </div>
        </div>
    );
};

export default EditTimeTableModal;
