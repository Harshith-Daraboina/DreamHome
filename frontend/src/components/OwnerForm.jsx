import React, { useState } from 'react';
import { createOwner, updateOwner } from '../services/api';

const OwnerForm = ({ owner, onSuccess }) => {
  const [formData, setFormData] = useState({
    Name: owner?.Name || '',
    ContactInfo: owner?.ContactInfo || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (owner) {
        await updateOwner(owner.OwnerID, formData);
      } else {
        await createOwner(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving owner:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {owner ? 'Edit Owner' : 'Add New Owner'}
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

        <div className="mb-6">
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

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {owner ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default OwnerForm;