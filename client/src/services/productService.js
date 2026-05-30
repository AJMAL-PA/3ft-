import api from './api';

export const productService = {
  getAll: (params = {}) => api.get('/products', { params }),
  getFeatured: () => api.get('/products/featured'),
  getById: (id) => api.get(`/products/${id}`),
  getStats: () => api.get('/products/admin/stats'),

  create: (formData) =>
    api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),

  update: (id, formData) =>
    api.put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),

  delete: (id) => api.delete(`/products/${id}`),
};
