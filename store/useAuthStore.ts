import { create } from 'zustand';
import cookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export type AuthStore = {
    token: string | null;
    role: string | null;
    setToken: (token: string | null) => void;
};

const decodeTokenAndGetRole = (token: string | null): string | null => {
    if (token) {
        try {
            const decoded: { role: string } = jwtDecode(token);
            return decoded.role || null;
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
    }
    return null;
};

export const useAuthStore = create<AuthStore>((set) => ({
    token: cookie.get('token') || null,
    role: cookie.get('role') || null,
    setToken: (token) => {
        set({ token });
        const role = decodeTokenAndGetRole(token);
        set({ role });
    },
}));
