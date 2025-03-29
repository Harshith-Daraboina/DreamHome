import React, { useState } from 'react';
import PropertyList from '../components/PropertyList';
import PropertyForm from '../components/PropertyForm';

const Properties = () => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Properties</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add New Property
        </button>
      </div>

      <PropertyList refresh={refresh} />

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add New Property</h2>
                <button 
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <PropertyForm 
                onSuccess={() => {
                  setRefresh(!refresh);
                  setOpen(false);
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;