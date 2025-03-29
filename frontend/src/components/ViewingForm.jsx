import React, { useState, useEffect } from 'react';
import { createViewing, updateViewing } from '../services/api';
import { getClients, getProperties } from '../services/api';

const ViewingForm = ({ viewing, onSuccess }) => {
  const [formData, setFormData] = useState({
    ClientID: viewing?.ClientID || '',
    PropertyID: viewing?.PropertyID || '',
    Date: viewing?.Date || '',
    Comments: viewing?.Comments || ''
  });

  const [clients, setClients] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await getClients();
        const propertiesResponse = await getProperties();
        setClients(clientsResponse.data);
        setProperties(propertiesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (viewing) {
        await updateViewing(viewing.ViewingID, formData);
      } else {
        await createViewing(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving viewing:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {viewing ? 'Edit Viewing' : 'Add New Viewing'}
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="client">
            Client
          </label>
          <select
            id="client"
            name="ClientID"
            value={formData.ClientID}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.ClientID} value={client.ClientID}>
                {client.Name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property">
            Property
          </label>
          <select
            id="property"
            name="PropertyID"
            value={formData.PropertyID}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select a property</option>
            {properties.map((property) => (
              <option key={property.PropertyID} value={property.PropertyID}>
                {property.Address}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            name="Date"
            type="date"
            value={formData.Date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comments">
            Comments
          </label>
          <textarea
            id="comments"
            name="Comments"
            value={formData.Comments}
            onChange={handleChange}
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {viewing ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ViewingForm;