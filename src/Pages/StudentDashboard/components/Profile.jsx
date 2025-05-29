import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log("Loaded user from localStorage:", parsedUser);
            setUser(parsedUser);
        }
    }, []);

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-2">User Profile</h2>
            <p><strong>Name:</strong> {user.firstName}</p>
            <p><strong>Role:</strong> {user.role}</p>
            {/* Add other user fields as needed */}
        </div>
    );
};

export default Profile;
