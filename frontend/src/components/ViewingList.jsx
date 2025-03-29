import React, { useState, useEffect } from 'react';
import { getViewings, deleteViewing } from '../services/api';

const ViewingList = () => {
  const [viewings, setViewings] = useState([]);

  useEffect(() => {
    fetchViewings();
  }, []);

  const fetchViewings = async () => {
    try {
      const response = await getViewings();
      setViewings(response.data);
    } catch (error) {
      console.error('Error fetching viewings:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteViewing(id);
      fetchViewings();
    } catch (error) {
      console.error('Error deleting viewing:', error);
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {viewings.map((viewing) => (
            <tr key={viewing.ViewingID} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{viewing.ViewingID}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{viewing.ClientName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{viewing.PropertyAddress}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(viewing.Date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{viewing.Comments}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button 
                  onClick={() => handleDelete(viewing.ViewingID)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewingList;