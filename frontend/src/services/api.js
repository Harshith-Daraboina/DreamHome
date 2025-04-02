import axios from 'axios';

const API_URL = 'http://localhost:5000';


// Properties
export const getProperties = () => axios.get(`${API_URL}/properties`);
export const getProperty = (id) => axios.get(`${API_URL}/properties/${id}`);
export const searchProperties = (query) => axios.get(`${API_URL}/properties/search`, { params: { q: query } });
export const createProperty = (property) => axios.post(`${API_URL}/properties`, property);
export const updateProperty = (id, property) => axios.put(`${API_URL}/properties/${id}`, property);
export const deleteProperty = (id) => axios.delete(`${API_URL}/properties/${id}`);

// Branches
export const getBranches = () => axios.get(`${API_URL}/branches`);
export const createBranch = (branch) => axios.post(`${API_URL}/branches`, branch);
export const updateBranch = (id, branch) => axios.put(`${API_URL}/branches/${id}`, branch);
export const deleteBranch = (id) => axios.delete(`${API_URL}/branches/${id}`);

// Staff
export const getStaff = () => axios.get(`${API_URL}/staff`);
// src/services/api.js
export const getStaffByBranch = (branchId) => {
    console.log(branchId);
    return axios.get(`${API_URL}/staff`, {
      params: { branchId }  // Make sure this matches your backend parameter name
    });
  };
export const createStaff = (staff) => axios.post(`${API_URL}/staff`, staff);
export const updateStaff = (id, staff) => axios.put(`${API_URL}/staff/${id}`, staff);
export const deleteStaff = (id) => axios.delete(`${API_URL}/staff/${id}`);

// Owners
export const getOwners = () => axios.get(`${API_URL}/owners`);
export const createOwner = (owner) => axios.post(`${API_URL}/owners`, owner);
export const updateOwner = (id, owner) => axios.put(`${API_URL}/owners/${id}`, owner);
export const deleteOwner = (id) => axios.delete(`${API_URL}/owners/${id}`);

// Clients
export const getClients = () => axios.get(`${API_URL}/clients`);
export const createClient = (client) => axios.post(`${API_URL}/clients`, client);
export const updateClient = (id, client) => axios.put(`${API_URL}/clients/${id}`, client);
export const deleteClient = (id) => axios.delete(`${API_URL}/clients/${id}`);

// Viewings
export const getViewings = () => axios.get(`${API_URL}/viewings`);
export const createViewing = (viewing) => axios.post(`${API_URL}/viewings`, viewing);
export const updateViewing = (id, viewing) => axios.put(`${API_URL}/viewings/${id}`, viewing);
export const deleteViewing = (id) => axios.delete(`${API_URL}/viewings/${id}`);

// Leases
export const getLeases = () => axios.get(`${API_URL}/leases`);
export const createLease = (lease) => axios.post(`${API_URL}/leases`, lease);
export const updateLease = (id, lease) => axios.put(`${API_URL}/leases/${id}`, lease);
export const deleteLease = (id) => axios.delete(`${API_URL}/leases/${id}`);