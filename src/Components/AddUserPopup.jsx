import React, { useState, useEffect } from 'react';
import api from '../../api';

const AddUserPopup = ({ isOpen, onClose }) => {
    const [courses, setCourses] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null); // start with no role selected

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        contact: '',
        email: '',
        password: '',
        courseIds: [],
        parentFirstName: '',
        parentLastName: '',
        parentAddress: '',
        parentContact: '',
        parentEmail: '',
        parentPassword: '',
    });

    const [formDataStaff, setFormDataStaff] = useState({
        firstName: '',
        lastName: '',
        address: '',
        contact: '',
        email: '',
        password: '',
        role: '',
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await api.get('/courses/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCourses(response.data.courses);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
        }
        fetchCourses();
    }, [token]);

    // Separate handleChange for student form
    const handleChangeStudent = (e) => {
        const { name, value, options } = e.target;
        if (name === 'courseIds') {
            const selectedOptions = Array.from(options)
                .filter((option) => option.selected)
                .map((option) => option.value);
            setFormData((prev) => ({ ...prev, courseIds: selectedOptions }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Separate handleChange for staff form
    const handleChangeStaff = (e) => {
        const { name, value } = e.target;
        setFormDataStaff((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitStudent = async (e) => {
        e.preventDefault();
        try {
            await api.post('/student/add', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Student registered successfully!');
            onCloseHandler();
        } catch (err) {
            console.error(err);
            alert('Failed to register student.');
        }
    };

    const handleSubmitStaff = async (e) => {
        e.preventDefault();
        try {
            await api.post('/user/create', formDataStaff, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Staff registered successfully!');
            onCloseHandler();
        } catch (err) {
            console.error(err);
            alert('Failed to register staff.');
        }
    };

    const onCloseHandler = () => {
        onClose();
        setSelectedRole(null);
        resetForms();
    };

    const resetForms = () => {
        setFormData({
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            email: '',
            password: '',
            courseIds: [],
            parentFirstName: '',
            parentLastName: '',
            parentAddress: '',
            parentContact: '',
            parentEmail: '',
            parentPassword: '',
        });
        setFormDataStaff({
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            email: '',
            password: '',
            role: '',
        });
    };

    const handleBack = () => {
        setSelectedRole(null);
        resetForms();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 min-w-[350px] max-w-[90%] max-h-[90vh] overflow-y-auto">
                {!selectedRole && (
                    <>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Choose User Type</h2>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => setSelectedRole('student')}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Student
                            </button>
                            <button
                                onClick={() => setSelectedRole('staff')}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Staff
                            </button>
                            <button  onClick={onCloseHandler}>Back</button>
                        </div>
                    </>
                )}

                {selectedRole === 'student' && (
                    <>
                        <h2 className="text-xl font-bold text-gray-800">Student Registration</h2>
                        <form onSubmit={handleSubmitStudent} className="space-y-3 flex flex-col">
                            <div className="flex gap-5">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChangeStudent}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChangeStudent}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChangeStudent}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                name="contact"
                                placeholder="Contact"
                                value={formData.contact}
                                onChange={handleChangeStudent}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChangeStudent}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChangeStudent}
                                className="w-full border p-2 rounded"
                                required
                            />

                            <label className="font-semibold mt-2">Select Courses</label>
                            <select
                                name="courseId"
                                value={formData.courseId}
                                onChange={handleChangeStudent}
                                className="w-full border p-2 rounded"
                            >
                                <option value="">Select a course</option>
                                {courses.map(course => (
                                    <option key={course._id} value={course._id}>
                                        {course.courseName}
                                    </option>
                                ))}
                            </select>

                            <hr className="my-4" />

                            <h3 className="font-semibold">Parent Information</h3>
                            <input
                                type="text"
                                name="parentFirstName"
                                placeholder="Parent First Name"
                                value={formData.parentFirstName}
                                onChange={handleChangeStudent}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="text"
                                name="parentLastName"
                                placeholder="Parent Last Name"
                                value={formData.parentLastName}
                                onChange={handleChangeStudent}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="text"
                                name="parentAddress"
                                placeholder="Parent Address"
                                value={formData.parentAddress}
                                onChange={handleChangeStudent}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="text"
                                name="parentContact"
                                placeholder="Parent Contact"
                                value={formData.parentContact}
                                onChange={handleChangeStudent}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="email"
                                name="parentEmail"
                                placeholder="Parent Email"
                                value={formData.parentEmail}
                                onChange={handleChangeStudent}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="password"
                                name="parentPassword"
                                placeholder="Parent Password"
                                value={formData.parentPassword}
                                onChange={handleChangeStudent}
                                className="w-full border p-2 rounded"
                            />

                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
                                Register
                            </button>
                        </form>
                        <button
                            onClick={handleBack}
                            className="text-sm mt-2 text-blue-500 hover:underline self-start"
                        >
                            Back
                        </button>
                    </>
                )}

                {selectedRole === 'staff' && (
                    <>
                        <h2 className="text-xl font-bold text-gray-800">Staff Registration</h2>
                        <form onSubmit={handleSubmitStaff} className="space-y-3 mt-3 flex flex-col">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Staff First Name"
                                value={formDataStaff.firstName}
                                onChange={handleChangeStaff}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Staff Last Name"
                                value={formDataStaff.lastName}
                                onChange={handleChangeStaff}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formDataStaff.address}
                                onChange={handleChangeStaff}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                name="contact"
                                placeholder="Contact"
                                value={formDataStaff.contact}
                                onChange={handleChangeStaff}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formDataStaff.email}
                                onChange={handleChangeStaff}
                                className="w-full border p-2 rounded"
                                required
                            />

                            <label className="font-semibold">Select Role</label>
                            <select
                                name="role"
                                value={formDataStaff.role}
                                onChange={handleChangeStaff}
                                className="w-full border p-2 rounded"
                                required
                            >
                                <option value="">Choose a role</option>
                                <option value="admin">Admin</option>
                                <option value="lecture">Lecture</option>
                            </select>

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formDataStaff.password}
                                onChange={handleChangeStaff}
                                className="w-full border p-2 rounded"
                                required
                            />

                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                                Register
                            </button>
                        </form>

                        <button
                            onClick={handleBack}
                            className="text-sm mt-2 text-green-500 hover:underline self-start"
                        >
                            Back
                        </button>
                    </>
                )}

            </div>
        </div>
    );
};

export default AddUserPopup;
