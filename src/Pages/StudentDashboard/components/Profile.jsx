import React, { useEffect, useState } from 'react';
import api from '../../../../api';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                const token = localStorage.getItem("token");

                if (storedUser && token) {
                    const parsedUser = JSON.parse(storedUser);
                    console.log("Loaded user from localStorage:", parsedUser);

                    const response = await api.get(`/user/id/${parsedUser.id}`, {

                        headers: { Authorization: `Bearer ${token}` },
                    });

                    setUser(response.data);
                }
            } catch (err) {
                console.error("Error fetching user from API:", err);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
            <div className="flex items-center space-x-4">
                <div className="bg-blue-100 text-blue-600 rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg">
                    {user.firstName[0]}{user.lastName[0]}
                </div>
                <div>
                    <h2 className="text-2xl font-semibold">{user.firstName} {user.lastName}</h2>
                    <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                </div>
            </div>

            <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
                <p><span className="font-medium">Address:</span> {user.address}</p>
                <p><span className="font-medium">Contact:</span> {user.contact}</p>
                <p><span className="font-medium">Email:</span> {user.email}</p>
            </div>
        </div>
    );
};

export default Profile;
