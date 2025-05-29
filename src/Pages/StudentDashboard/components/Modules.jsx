import React, { useEffect, useState } from 'react';
import api from '../../../../api';

export default function Modules({ courseId }) {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchModules() {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No auth token found');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/modules/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setModules(response.data.modules);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch modules');
      } finally {
        setLoading(false);
      }
    }

    if (courseId) {
      fetchModules();
    }
  }, [courseId]);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Modules</h2>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span className="ml-3 text-blue-600 font-medium">Loading modules...</span>
        </div>
      )}

      {error && (
        <p className="text-red-600 bg-red-100 p-3 rounded mb-4">{error}</p>
      )}

      {!loading && !error && modules.length === 0 && (
        <p className="text-gray-500 italic text-center">No modules found for this course.</p>
      )}

      <ul className="space-y-3 mt-4">
        {modules.map((mod) => (
          <li
            key={mod._id || mod.id}
            className="border border-gray-200 rounded-md p-3 hover:shadow-md transition-shadow cursor-pointer bg-gray-50"
            title={mod.moduleName}
          >
            <p className="text-gray-800 font-medium">{mod.moduleName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
