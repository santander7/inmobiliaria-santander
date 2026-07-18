import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'ADMIN',
  },
  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials);
        this.token = response.data.accessToken;
        this.user = {
          id: response.data.id,
          nombre: response.data.nombre,
          correo: response.data.correo,
          role: response.data.role
        };
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        return response.data;
      } catch (error) {
        throw error.response?.data?.message || 'Error al iniciar sesión';
      }
    },
    async register(userData) {
      try {
        const response = await api.post('/auth/register', userData);
        return response.data;
      } catch (error) {
        throw error.response?.data?.message || 'Error al registrar';
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});
