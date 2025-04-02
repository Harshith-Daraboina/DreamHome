import React, { useState } from 'react';
import StaffList from '../components/StaffList';
import StaffForm from '../components/StaffForm';
import BranchList from '../components/BranchList';
import BranchForm from '../components/BranchForm';
import { FiUsers, FiHome, FiPlus, FiChevronLeft } from 'react-icons/fi';

const StaffPortal = () => {
  const [staffOpen, setStaffOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleStaffOpen = () => setStaffOpen(true);
  const handleStaffClose = () => setStaffOpen(false);
  const handleBranchOpen = () => setBranchOpen(true);
  const handleBranchClose = () => setBranchOpen(false);

  const handleSuccess = () => {
    setRefresh(!refresh);
    setStaffOpen(false);
    setBranchOpen(false);
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
  };

  const handleBackToBranches = () => {
    setSelectedBranch(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">DreamHome Staff Portal</h1>
        <p className="text-gray-600">Manage your branches and staff members</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Branches */}
        <div className={`lg:col-span-1 ${selectedBranch ? 'hidden lg:block' : ''}`}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <FiHome className="mr-2" /> Branches
              </h2>
              <button
                onClick={handleBranchOpen}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center text-sm"
              >
                <FiPlus className="mr-1" /> Add Branch
              </button>
            </div>
            <BranchList 
              refresh={refresh} 
              onSelect={handleBranchSelect}
              selectedBranch={selectedBranch}
            />
          </div>
        </div>

        {/* Right Panel - Staff */}
        <div className={`lg:col-span-2 ${!selectedBranch ? 'hidden lg:block' : ''}`}>
          <div className="bg-white rounded-lg shadow-md p-6">
            {selectedBranch ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <button 
                      onClick={handleBackToBranches}
                      className="text-blue-600 hover:text-blue-800 flex items-center mb-2 lg:hidden"
                    >
                      <FiChevronLeft className="mr-1" /> Back to Branches
                    </button>
                    <h2 className="text-xl font-semibold flex items-center">
                      <FiUsers className="mr-2" /> 
                      Staff at {selectedBranch.Name}
                    </h2>
                    <p className="text-sm text-gray-500">{selectedBranch.Address}</p>
                  </div>
                  <button
                    onClick={handleStaffOpen}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center text-sm"
                  >
                    <FiPlus className="mr-1" /> Add Staff
                  </button>
                </div>
                <StaffList 
                  refresh={refresh} 
                  branchId={selectedBranch.BranchID}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <FiUsers className="mx-auto text-4xl text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-500">Select a branch to view staff</h3>
                <p className="text-gray-400">Click on any branch from the list to see its employees</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Staff Dialog */}
      {staffOpen && selectedBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold">
                Add Staff to {selectedBranch.Name}
              </h3>
              <button 
                onClick={handleStaffClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <StaffForm 
                onSuccess={handleSuccess} 
                branchId={selectedBranch.BranchID}
              />
            </div>
          </div>
        </div>
      )}

      {/* Branch Dialog */}
      {branchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold">Add New Branch</h3>
              <button 
                onClick={handleBranchClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <BranchForm onSuccess={handleSuccess} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffPortal;