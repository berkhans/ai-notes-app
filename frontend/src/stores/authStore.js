import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Mock login for development
          if (email && password) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const mockUser = {
              id: '1',
              name: 'Test User',
              email: email,
              token: 'mock-token-' + Date.now()
            };
            
            // Update state immediately
            set({
              user: mockUser,
              token: mockUser.token,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });

            // Set token in API headers
            api.defaults.headers.common['Authorization'] = `Bearer ${mockUser.token}`;
            
            return mockUser;
          } else {
            throw new Error('E-posta ve şifre gereklidir');
          }
        } catch (error) {
          const errorMessage = error.message || 'Giriş yapılırken bir hata oluştu';
          set({
            isLoading: false,
            error: errorMessage
          });
          throw new Error(errorMessage);
        }
      },

      // Register
      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Mock register for development
          if (name && email && password) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const mockUser = {
              id: '1',
              name: name,
              email: email,
              token: 'mock-token-' + Date.now()
            };
            
            // Update state immediately
            set({
              user: mockUser,
              token: mockUser.token,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });

            // Set token in API headers
            api.defaults.headers.common['Authorization'] = `Bearer ${mockUser.token}`;
            
            return mockUser;
          } else {
            throw new Error('Tüm alanlar gereklidir');
          }
        } catch (error) {
          const errorMessage = error.message || 'Kayıt olurken bir hata oluştu';
          set({
            isLoading: false,
            error: errorMessage
          });
          throw new Error(errorMessage);
        }
      },

      // Logout
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
        
        // Remove token from API headers
        delete api.defaults.headers.common['Authorization'];
      },

      // Initialize auth (check if user is already logged in)
      initializeAuth: () => {
        const state = get();
        if (state.token && state.user) {
          api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
        }
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

export { useAuthStore };
export default useAuthStore; 