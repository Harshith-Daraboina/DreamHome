import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProperties, deleteProperty } from '../services/api';
import { FiSearch, FiEdit2, FiTrash2, FiEye, FiPlus, FiHome } from 'react-icons/fi';

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const filtered = properties.filter(property => 
      property.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.Rent.toString().includes(searchTerm) ||
      (property.OwnerName && property.OwnerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (property.BranchName && property.BranchName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await getProperties();
      setProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(id);
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  const handleCardClick = (id) => {
    navigate(`/properties/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Property Management</h1>
        
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search properties..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          onClick={() => navigate('/properties/new')}
        >
          <FiPlus /> Add Property
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          {searchTerm ? (
            <p className="text-gray-500">No properties found matching your search.</p>
          ) : (
            <p className="text-gray-500">No properties available. Add a new property to get started.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div 
              key={property.PropertyID} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleCardClick(property.PropertyID)}
            >
              {/* Property Image with Default Icon */}
              <div className="h-48 bg-gray-100 flex flex-col items-center justify-center relative">
                <FiHome className="text-gray-400 text-5xl mb-2" />
                <span className="text-gray-500 text-sm">Property Image</span>
                <span className="absolute bottom-4 right-4 bg-white text-blue-600 text-sm font-bold px-3 py-1 rounded-full shadow">
                  ${property.Rent}/month
                </span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{property.Address}</h3>
                <div className="flex flex-col gap-1 text-sm text-gray-600 mb-4">
                  <p><span className="font-medium">Owner:</span> {property.OwnerName || 'N/A'}</p>
                  <p><span className="font-medium">Branch:</span> {property.BranchName || 'N/A'}</p>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <button 
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(property.PropertyID);
                    }}
                  >
                    <FiEye /> View
                  </button>
                  <button 
                    className="flex items-center gap-1 text-green-600 hover:text-green-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/properties/${property.PropertyID}/edit`);
                    }}
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(property.PropertyID);
                    }}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;