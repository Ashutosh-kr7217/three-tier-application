import axios from 'axios';

// API base URL - change this to match your deployed backend URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all items
export const fetchItems = async () => {
  try {
    const response = await api.get('/items/');
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

// Fetch a single item by ID
export const fetchItemById = async (id) => {
  try {
    const response = await api.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching item ${id}:`, error);
    throw error;
  }
};

// Create a new item
export const createItem = async (itemData) => {
  try {
    const response = await api.post('/items/', itemData);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

// Update an existing item
export const updateItem = async (id, itemData) => {
  try {
    const response = await api.put(`/items/${id}`, itemData);
    return response.data;
  } catch (error) {
    console.error(`Error updating item ${id}:`, error);
    throw error;
  }
};

// Delete an item
export const deleteItem = async (id) => {
  try {
    await api.delete(`/items/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting item ${id}:`, error);
    throw error;
  }
};