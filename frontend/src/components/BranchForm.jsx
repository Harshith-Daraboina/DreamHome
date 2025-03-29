import React, { useState } from 'react';
import { createBranch, updateBranch } from '../services/api';

const BranchForm = ({ branch, onSuccess }) => {
  const [formData, setFormData] = useState({
    BranchName: branch?.BranchName || '',
    Address: branch?.Address || '',
    Phone: branch?.Phone || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (branch) {
        await updateBranch(branch.BranchID, formData);
      } else {
        await createBranch(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving branch:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {branch ? 'Edit Branch' : 'Add New Branch'}
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="branchName">
            Branch Name
          </label>
          <input
            id="branchName"
            name="BranchName"
            value={formData.BranchName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

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

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="Phone"
            value={formData.Phone}
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
            {branch ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BranchForm;