import React, { useState, useEffect } from 'react';
import { getStaffByBranch, deleteStaff } from '../services/api';

const StaffList = ({ branchId, refresh }) => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("🔄 useEffect triggered with branchId:", branchId); // Check if effect runs
    console.log("🔄 Refresh state:", refresh); // Check if refresh changes
  
    const fetchStaff = async () => {
      if (!branchId) {
        setStaff([]); 
        return;
      }
  
      try {
        setLoading(true);
        console.log("Fetching staff for branch ID:", branchId); 
  
        const response = await getStaffByBranch(branchId);
        console.log("✅ API Response:", response.data); // Confirm API returns correct data
        setStaff(response.data);
      } catch (error) {
        console.error("❌ Error fetching staff:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStaff();
  }, [branchId, refresh]); // ✅ This should trigger on branchId change
  
  // useEffect(() => {
  //   const fetchStaff = async () => {
  //     try {
  //       setLoading(true);
  //       console.log('Fetching staff for branch:', branchId);
        
  //       if (branchId) {
  //         const response = await getStaffByBranch(branchId);
  //         console.log('API Response:', response);
  //         console.log('Staff Data:', response.data);
  //         setStaff(response.data);
  //       } else {
  //         setStaff([]);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching staff:', error.response || error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchStaff();
  // }, [branchId, refresh]);
  

  const handleDelete = async (id) => {
    try {
      await deleteStaff(id);
      setStaff(staff.filter(member => member.StaffID !== id));
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading staff...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {staff.length > 0 ? (
            staff.map((member) => (
              <tr key={member.StaffID}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {member.Name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{member.Name}</div>
                      <div className="text-sm text-gray-500">ID: {member.StaffID}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.Position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${member.Salary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button 
                    onClick={() => handleDelete(member.StaffID)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                {branchId ? 'No staff members in this branch' : 'Select a branch to view staff'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;