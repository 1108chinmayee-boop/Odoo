import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Test connection to backend
export const testConnection = async () => {
  try {
    const response = await api.get('/health');
    console.log('✅ Backend connected:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    return null;
  }
};

export default api;
