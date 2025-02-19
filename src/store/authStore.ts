import { create } from 'zustand';

interface AuthState {
  user: { username: string; email: string } | null;
  token: string | null;
  login: (user: { username: string; email: string }, token: string) => void;
  logout: () => void;
  register: (user: { username: string; email: string }, token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,

    login: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token });
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },

    register: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token });
    },
}));
