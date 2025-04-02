import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiHome, FiDollarSign, FiLayers, FiPhone, FiUser } from 'react-icons/fi';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch property');
        }

        setProperty(result.data);
      } catch (err) {
        setError(err.message || 'Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 mb-4 hover:text-blue-800"
        >
          <FiArrowLeft className="mr-2" /> Back to Properties
        </button>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Property not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 mb-4 hover:text-blue-800"
      >
        <FiArrowLeft className="mr-2" /> Back to Properties
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-64 md:h-96 overflow-hidden bg-gray-100 flex items-center justify-center">
          {property.image ? (
            <img 
              src={property.image} 
              alt={property.Address} 
              className="w-full h-full object-cover"
              onError={(e) => e.target.src = 'https://via.placeholder.com/800x400?text=Property+Image'}
            />
          ) : (
            <div className="text-center text-gray-500">
              <FiHome className="text-5xl mx-auto mb-2" />
              <p>No image available</p>
            </div>
          )}
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{property.Address}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <FiMapPin className="mr-2 text-blue-500" />
              {property.Location || 'Location not specified'}
            </div>
            <div className="flex items-center text-gray-600">
              <FiHome className="mr-2 text-blue-500" />
              {property.Type}
            </div>
            <div className="flex items-center text-gray-600">
              <FiDollarSign className="mr-2 text-blue-500" />
              ₹{property.Rent}/month
            </div>
            {property.Area && (
              <div className="flex items-center text-gray-600">
                <FiLayers className="mr-2 text-blue-500" />
                {property.Area} sq.ft
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">
              {property.Description || 'No description available.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.Amenities?.length > 0 ? (
                  property.Amenities.map((amenity, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {amenity}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No amenities listed</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Owner Information</h2>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FiUser className="mr-2 text-blue-500" />
                  {property.OwnerName || 'Not specified'}
                </div>
                {property.OwnerContact && (
                  <div className="flex items-center text-gray-600">
                    <FiPhone className="mr-2 text-blue-500" />
                    {property.OwnerContact}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Owner
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Schedule Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;