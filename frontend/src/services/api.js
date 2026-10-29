import axios from 'axios';

const getBaseUrl = () => {
  let url = import.meta.env.VITE_API_BASE_URL || '/api';
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  if (url.startsWith('http') && !url.endsWith('/api')) {
    url = `${url}/api`;
  }
  return url;
};

const api = axios.create({
  baseURL: getBaseUrl()
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
