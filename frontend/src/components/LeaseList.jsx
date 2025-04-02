import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiDollarSign, FiCalendar, FiHome, FiUser } from 'react-icons/fi';
import { getLeases, deleteLease } from '../services/api';

const LeaseList = () => {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeases();
  }, []);

  const fetchLeases = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getLeases();
      setLeases(response.data);
    } catch (error) {
      console.error('Error fetching leases:', error);
      setError('Failed to load leases. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lease?')) {
      try {
        await deleteLease(id);
        fetchLeases();
      } catch (error) {
        console.error('Error deleting lease:', error);
        setError('Failed to delete lease. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={fetchLeases}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800">Lease Agreements</h2>
        <p className="text-sm text-gray-500 mt-1">Manage all active property leases</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <FiUser className="mr-2 text-blue-500" /> Client
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <FiHome className="mr-2 text-blue-500" /> Property
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <FiCalendar className="mr-2 text-blue-500" /> Term
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <FiDollarSign className="mr-2 text-blue-500" /> Rent
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leases.length > 0 ? (
              leases.map((lease) => (
                <tr key={lease.LeaseID} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{lease.ClientName}</div>
                    <div className="text-xs text-gray-500">ID: {lease.ClientID}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{lease.PropertyAddress}</div>
                    <div className="text-xs text-gray-500">ID: {lease.PropertyID}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(lease.StartDate).toLocaleDateString()} - {' '}
                      {new Date(lease.EndDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.ceil((new Date(lease.EndDate) - new Date(lease.StartDate)) / (1000 * 60 * 60 * 24))} days
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      ${lease.MonthlyRent.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      ${(lease.MonthlyRent * 12).toLocaleString()}/yr
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(lease.LeaseID)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="text-gray-500">No leases found</div>
                  <button
                    onClick={fetchLeases}
                    className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Refresh
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaseList;