import api from './api';

export const attributeService = {
  getAll: () => api.get('/attributes'),
  getById: (id) => api.get(`/attributes/${id}`),
  create: (data) => api.post('/attributes', data),
  update: (id, data) => api.put(`/attributes/${id}`, data),
  delete: (id) => api.delete(`/attributes/${id}`),
};
