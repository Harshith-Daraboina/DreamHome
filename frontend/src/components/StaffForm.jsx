import React, { useState } from 'react';
import { createStaff, updateStaff } from '../services/api';

const StaffForm = ({ staff, onSuccess }) => {
  const [formData, setFormData] = useState({
    Name: staff?.Name || '',
    Position: staff?.Position || '',
    Salary: staff?.Salary || '',
    BranchID: staff?.BranchID || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (staff) {
        await updateStaff(staff.StaffID, formData);
      } else {
        await createStaff(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving staff:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {staff ? 'Edit Staff' : 'Add New Staff'}
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
            Position
          </label>
          <input
            id="position"
            name="Position"
            value={formData.Position}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
            Salary
          </label>
          <input
            id="salary"
            name="Salary"
            type="number"
            value={formData.Salary}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="branchId">
            Branch ID
          </label>
          <input
            id="branchId"
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
            {staff ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default StaffForm;