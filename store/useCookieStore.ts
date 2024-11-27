import { create } from 'zustand';
import Cookies from 'js-cookie';
import { useAuthStore } from './useAuthStore';

interface CookieStore {
  cookies: Record<string, string | undefined>;
  setCookie: (cookieName: string, cookieValue: string | undefined) => void;
  watchCookies: () => void;
  isWatching: boolean;
}

const useCookieStore = create<CookieStore>((set) => ({
  cookies: {},
  setCookie: (cookieName, cookieValue) => {
    set((state) => ({
      cookies: { ...state.cookies, [cookieName]: cookieValue },
    }));
  },
  isWatching: false,
  watchCookies: () => {
    set((state) => {
      if (state.isWatching) return state;
      set({ isWatching: true });

      setInterval(() => {
        const cookieName = "token"; 
        const currentCookieValue = Cookies.get(cookieName);
        set((state) => {
          const currentStoredValue = state.cookies[cookieName];
          if (currentStoredValue !== currentCookieValue) {
            useAuthStore.getState().setToken(currentCookieValue || null);
          }

          return {
            cookies: { ...state.cookies, [cookieName]: currentCookieValue },
          };
        });
      }, 1000); 
      return state;
    });
  },
}));

export default useCookieStore;
