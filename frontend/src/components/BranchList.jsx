import React, { useState, useEffect } from 'react';
import { getBranches } from '../services/api';

const BranchList = ({ refresh, onSelect, selectedBranch }) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranches();
  }, [refresh]);

  const fetchBranches = async () => {
    try {
      const response = await getBranches();
      setBranches(response.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading branches...</div>;

  return (
    <div className="space-y-3">
      {branches.map(branch => (
        <div 
          key={branch.BranchID}
          onClick={() => onSelect(branch)}
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedBranch?.BranchID === branch.BranchID 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <h3 className="font-medium">{branch.Name}</h3>
          <p className="text-sm text-gray-600">{branch.Address}</p>
          <p className="text-xs text-gray-500 mt-1">
            {branch.StaffCount || 0} staff members
          </p>
        </div>
      ))}
    </div>
  );
};

export default BranchList;