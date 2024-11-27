import { create } from 'zustand';
import cookie from 'js-cookie';

export type AuthStore = {
    token: string | null;
    role: string | null;
    setToken: (token: string | null) => void;
    setRole: (role: string | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    token: cookie.get('token') || null,
    setToken: (token) => {
        set({ token });
        cookie.set('token', token, { expires: 7 });
    },
    role: cookie.get('role') || null,
}));