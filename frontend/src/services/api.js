import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const inquiryService = {
  submitInquiry: (data) => api.post('/inquiries', data),
  getInquiries: (params) => api.get('/inquiries', { params }),
  getInquiryById: (id) => api.get(`/inquiries/${id}`),
  updateStatus: (id, status) => api.patch(`/inquiries/${id}/status`, { status })
};

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data)
};

export default api;
