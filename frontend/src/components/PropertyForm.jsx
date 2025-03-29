import React, { useState } from 'react';
import { createProperty, updateProperty } from '../services/api';

const PropertyForm = ({ property, onSuccess }) => {
  const [formData, setFormData] = useState({
    Address: property?.Address || '',
    Rent: property?.Rent || '',
    OwnerID: property?.OwnerID || '',
    BranchID: property?.BranchID || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (property) {
        await updateProperty(property.PropertyID, formData);
      } else {
        await createProperty(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {property ? 'Edit Property' : 'Add New Property'}
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rent">
            Rent
          </label>
          <input
            id="rent"
            name="Rent"
            type="number"
            value={formData.Rent}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="owner">
            Owner ID
          </label>
          <input
            id="owner"
            name="OwnerID"
            type="number"
            value={formData.OwnerID}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="branch">
            Branch ID
          </label>
          <input
            id="branch"
            name="BranchID"
            type="number"
            value={formData.BranchID}
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
            {property ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PropertyForm;