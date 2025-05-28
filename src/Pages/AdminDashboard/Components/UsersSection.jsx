import React, { useEffect, useState } from 'react';
import api from '../../../../api.js';
import AddUserPopup from '../../../Components/AddUserPopup.jsx';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/user/id/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(prev => prev.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleView = async (userId, mode) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/user/id/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedUser(response.data);
      setIsEditMode(mode === 'edit'); // true if edit
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/user/id/${selectedUser._id}`, selectedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');
    setSearchQuery(query);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('No auth token found');
          return;
        }

        let response;
        if (email) {
          response = await api.get(
            `/user/search/query?email=${email}&page=${currentPage}&limit=10`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        } else {
          response = await api.get(`/user/all?page=${currentPage}&limit=10`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        setUsers(response.data.users || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentPage, email]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Users Management</h2>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                name="search"
              />
            </div>
            <button
              type="submit"
              className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{user.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button onClick={() => handleView(user._id, 'view')}>
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleView(user._id, 'edit')}>
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(user._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-1">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <AddUserPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? 'Edit User' : 'User Details'}
            </h2>

            {isEditMode ? (
              <>
                <input
                  type="text"
                  value={selectedUser.firstName}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, firstName: e.target.value })
                  }
                  className="mb-2 w-full border rounded px-3 py-2"
                />
                <input
                  type="text"
                  value={selectedUser.lastName}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, lastName: e.target.value })
                  }
                  className="mb-2 w-full border rounded px-3 py-2"
                />
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="mb-2 w-full border rounded px-3 py-2"
                />
                <input
                  type="text"
                  value={selectedUser.address}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, address: e.target.value })
                  }
                  className="mb-2 w-full border rounded px-3 py-2"
                />
                <input
                  type="text"
                  value={selectedUser.contact}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, contact: e.target.value })
                  }
                  className="mb-4 w-full border rounded px-3 py-2"
                />
                <button
                  className="mr-2 px-4 py-2 bg-green-600 text-white rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
                <p><strong>Address:</strong> {selectedUser.address}</p>
                <p><strong>Contact:</strong> {selectedUser.contact}</p>
              </>
            )}

            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default UsersSection;
