import React, { useState, useEffect } from 'react';
import { createProperty, updateProperty, getOwners, getBranches } from '../services/api';
import { FiX, FiHome, FiDollarSign, FiUser, FiMapPin } from 'react-icons/fi';

const PropertyForm = ({ property, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    Address: property?.Address || '',
    Rent: property?.Rent || '',
    OwnerID: property?.OwnerID || '',
    BranchID: property?.BranchID || ''
  });
  const [owners, setOwners] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ownersRes, branchesRes] = await Promise.all([
          getOwners(),
          getBranches()
        ]);
        setOwners(ownersRes.data);
        setBranches(branchesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Address) newErrors.Address = 'Address is required';
    if (!formData.Rent || formData.Rent <= 0) newErrors.Rent = 'Valid rent amount is required';
    if (!formData.OwnerID) newErrors.OwnerID = 'Owner is required';
    if (!formData.BranchID) newErrors.BranchID = 'Branch is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (property) {
        await updateProperty(property.PropertyID, formData);
      } else {
        await createProperty(formData);
      }
      onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error('Error saving property:', error);
      setErrors({ submit: 'Failed to save property. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-2xl mx-auto">
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>
      )}
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FiHome className="text-blue-500" />
        {property ? 'Edit Property' : 'Add New Property'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Address Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="text-gray-400" />
            </div>
            <input
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              className={`pl-10 w-full p-3 border ${errors.Address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="123 Main St, Cityville"
            />
          </div>
          {errors.Address && <p className="mt-1 text-sm text-red-600">{errors.Address}</p>}
        </div>

        {/* Rent Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="text-gray-400" />
            </div>
            <input
              type="number"
              name="Rent"
              min="0"
              step="0.01"
              value={formData.Rent}
              onChange={handleChange}
              className={`pl-10 w-full p-3 border ${errors.Rent ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="1500.00"
            />
          </div>
          {errors.Rent && <p className="mt-1 text-sm text-red-600">{errors.Rent}</p>}
        </div>

        {/* Owner Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-400" />
            </div>
            <select
              name="OwnerID"
              value={formData.OwnerID}
              onChange={handleChange}
              className={`pl-10 w-full p-3 border ${errors.OwnerID ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none`}
            >
              <option value="">Select Owner</option>
              {owners.map(owner => (
                <option key={owner.OwnerID} value={owner.OwnerID}>
                  {owner.Name} ({owner.OwnerID})
                </option>
              ))}
            </select>
          </div>
          {errors.OwnerID && <p className="mt-1 text-sm text-red-600">{errors.OwnerID}</p>}
        </div>

        {/* Branch Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="text-gray-400" />
            </div>
            <select
              name="BranchID"
              value={formData.BranchID}
              onChange={handleChange}
              className={`pl-10 w-full p-3 border ${errors.BranchID ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none`}
            >
              <option value="">Select Branch</option>
              {branches.map(branch => (
                <option key={branch.BranchID} value={branch.BranchID}>
                  {branch.BranchName} ({branch.BranchID})
                </option>
              ))}
            </select>
          </div>
          {errors.BranchID && <p className="mt-1 text-sm text-red-600">{errors.BranchID}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-blue-400 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span>{property ? 'Update Property' : 'Add Property'}</span>
            )}
          </button>
          {errors.submit && <p className="mt-2 text-sm text-red-600 text-center">{errors.submit}</p>}
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;