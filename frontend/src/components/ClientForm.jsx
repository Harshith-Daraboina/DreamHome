import React, { useState } from 'react';
import { createClient, updateClient } from '../services/api';

const ClientForm = ({ client, onSuccess }) => {
  const [formData, setFormData] = useState({
    Name: client?.Name || '',
    ContactInfo: client?.ContactInfo || '',
    Preferences: client?.Preferences || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (client) {
        await updateClient(client.ClientID, formData);
      } else {
        await createClient(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {client ? 'Edit Client' : 'Add New Client'}
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactInfo">
            Contact Info
          </label>
          <input
            id="contactInfo"
            name="ContactInfo"
            value={formData.ContactInfo}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preferences">
            Preferences
          </label>
          <textarea
            id="preferences"
            name="Preferences"
            value={formData.Preferences}
            onChange={handleChange}
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {client ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ClientForm;