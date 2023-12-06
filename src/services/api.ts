// api.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  async getDisasters() {
    return apiClient.get('/disaster/')
  },

  async getDisasterById(id: string) {
    return apiClient.get(`/disaster/${id}`)
  },

  async createDisaster(code: string) {
    const obj = { code: code }
    const jsonCode = JSON.stringify(obj);
    return apiClient.post('/disaster/', jsonCode);
  },

  async updateDisaster(id: string, code: string) {
    const obj = { code: code }
    const jsonCode = JSON.stringify(obj);
    return apiClient.patch(`/disaster/${id}`, jsonCode);
  },

  async deleteDisaster(id: string) {
    return apiClient.delete(`/disaster/${id}`);
  },
};