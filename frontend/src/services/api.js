import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsAPI = {
  getAll: () => api.get('/products'),
  getAvailable: () => api.get('/products/available'),
  getByCategory: (category) => api.get(`/products/category/${category}`),
  search: (name) => api.get(`/products/search?name=${name}`),
  getById: (id) => api.get(`/products/${id}`),
  create: (formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.post('/products', formData, config);
  },
  update: (id, formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.put(`/products/${id}`, formData, config);
  },
  delete: (id) => api.delete(`/products/${id}`),
  toggleAvailability: (id) => api.patch(`/products/${id}/toggle-availability`),
};

// Orders API
export const ordersAPI = {
  getAll: () => api.get('/orders'),
  getByStatus: (status) => api.get(`/orders/status/${status}`),
  getByPaymentStatus: (status) => api.get(`/orders/payment-status/${status}`),
  getById: (id) => api.get(`/orders/${id}`),
  create: (formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.post('/orders', formData, config);
  },
  updateStatus: (id, orderStatus) => 
    api.patch(`/orders/${id}/status?orderStatus=${orderStatus}`),
  updatePaymentStatus: (id, paymentStatus) => 
    api.patch(`/orders/${id}/payment-status?paymentStatus=${paymentStatus}`),
  delete: (id) => api.delete(`/orders/${id}`),
};

export default api;