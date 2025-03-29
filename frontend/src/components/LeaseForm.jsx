import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await getClients();
        const propertiesResponse = await getProperties();
        setClients(clientsResponse.data);
        setProperties(propertiesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      if (lease) {
        await updateLease(lease.LeaseID, formData);
      } else {
        await createLease(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving lease:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold">
        {lease ? 'Edit Lease' : 'Add New Lease'}
      </h2>

      <div>
        <label htmlFor="ClientID" className="block text-sm font-medium text-gray-700">
          Client
        </label>
        <select
          id="ClientID"
          name="ClientID"
          value={formData.ClientID}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.ClientID} value={client.ClientID}>
              {client.Name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="PropertyID" className="block text-sm font-medium text-gray-700">
          Property
        </label>
        <select
          id="PropertyID"
          name="PropertyID"
          value={formData.PropertyID}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Select a property</option>
          {properties.map((property) => (
            <option key={property.PropertyID} value={property.PropertyID}>
              {property.Address}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="StartDate" className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          id="StartDate"
          name="StartDate"
          type="date"
          value={formData.StartDate}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="EndDate" className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <input
          id="EndDate"
          name="EndDate"
          type="date"
          value={formData.EndDate}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="MonthlyRent" className="block text-sm font-medium text-gray-700">
          Monthly Rent
        </label>
        <input
          id="MonthlyRent"
          name="MonthlyRent"
          type="number"
          value={formData.MonthlyRent}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {lease ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default LeaseForm;
