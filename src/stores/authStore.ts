import { create } from 'zustand';

const AUTH_KEY = 'cinema_authenticated';
const ADMIN_KEY = 'cinema_admin';

const DEFAULT_PASSWORD = 'cinema2024';
const ADMIN_PASSWORD = '20100719zzq';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (password: string) => { success: boolean; isAdmin: boolean };
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem(AUTH_KEY) === 'true',
  isAdmin: localStorage.getItem(ADMIN_KEY) === 'true',
  
  login: (password: string) => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem(ADMIN_KEY, 'true');
      set({ isAuthenticated: true, isAdmin: true });
      return { success: true, isAdmin: true };
    }
    
    if (password === DEFAULT_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.removeItem(ADMIN_KEY);
      set({ isAuthenticated: true, isAdmin: false });
      return { success: true, isAdmin: false };
    }
    
    return { success: false, isAdmin: false };
  },
  
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(ADMIN_KEY);
    set({ isAuthenticated: false, isAdmin: false });
  }
}));
