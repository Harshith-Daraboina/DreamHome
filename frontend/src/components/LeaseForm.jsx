import React, { useState, useEffect } from 'react';
import { FiUser, FiHome, FiCalendar, FiDollarSign, FiSave } from 'react-icons/fi';
import { createLease, updateLease, getClients, getProperties } from '../services/api';

const LeaseForm = ({ lease, onSuccess }) => {
  const [formData, setFormData] = useState({
    ClientID: lease?.ClientID || '',
    PropertyID: lease?.PropertyID || '',
    StartDate: lease?.StartDate || '',
    EndDate: lease?.EndDate || '',
    MonthlyRent: lease?.MonthlyRent || ''
  });

  const [clients, setClients] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [clientsResponse, propertiesResponse] = await Promise.all([
          getClients(),
          getProperties()
        ]);
        setClients(clientsResponse.data);
        setProperties(propertiesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load form data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      if (lease) {
        await updateLease(lease.LeaseID, formData);
      } else {
        await createLease(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving lease:', error);
      setError('Failed to save lease. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !lease) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
        <FiSave className="mr-2 text-indigo-600" />
        {lease ? 'Edit Lease Agreement' : 'Create New Lease'}
      </h2>
      <p className="text-gray-600 mb-6">
        {lease ? 'Update the lease details below' : 'Fill in the form to create a new lease agreement'}
      </p>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client Selection */}
          <div className="space-y-2">
            <label htmlFor="ClientID" className="block text-sm font-medium text-gray-700 flex items-center">
              <FiUser className="mr-2 text-indigo-500" />
              Client
            </label>
            <select
              id="ClientID"
              name="ClientID"
              value={formData.ClientID}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              disabled={loading}
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.ClientID} value={client.ClientID}>
                  {client.Name} ({client.Email || 'No email'})
                </option>
              ))}
            </select>
          </div>

          {/* Property Selection */}
          <div className="space-y-2">
            <label htmlFor="PropertyID" className="block text-sm font-medium text-gray-700 flex items-center">
              <FiHome className="mr-2 text-indigo-500" />
              Property
            </label>
            <select
              id="PropertyID"
              name="PropertyID"
              value={formData.PropertyID}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              disabled={loading}
            >
              <option value="">Select a property</option>
              {properties.map((property) => (
                <option key={property.PropertyID} value={property.PropertyID}>
                  {property.Address} (${property.Rent}/mo)
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <label htmlFor="StartDate" className="block text-sm font-medium text-gray-700 flex items-center">
              <FiCalendar className="mr-2 text-indigo-500" />
              Start Date
            </label>
            <input
              id="StartDate"
              name="StartDate"
              type="date"
              value={formData.StartDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              disabled={loading}
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label htmlFor="EndDate" className="block text-sm font-medium text-gray-700 flex items-center">
              <FiCalendar className="mr-2 text-indigo-500" />
              End Date
            </label>
            <input
              id="EndDate"
              name="EndDate"
              type="date"
              value={formData.EndDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              disabled={loading}
            />
          </div>

          {/* Monthly Rent */}
          <div className="space-y-2">
            <label htmlFor="MonthlyRent" className="block text-sm font-medium text-gray-700 flex items-center">
              <FiDollarSign className="mr-2 text-indigo-500" />
              Monthly Rent
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                id="MonthlyRent"
                name="MonthlyRent"
                type="number"
                min="0"
                step="0.01"
                value={formData.MonthlyRent}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 py-2 pl-7 pr-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="0.00"
                required
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => onSuccess()}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors flex items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FiSave className="mr-2" />
                {lease ? 'Update Lease' : 'Create Lease'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaseForm;