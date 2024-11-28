import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import Cookies from 'js-cookie';


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error.response && error.response.status === 401) || error.response.status === 403) {
      try {

        const refreshToken = Cookies.get('refreshToken');

        if (!refreshToken) {
          // window.location.href = '/login';
          return Promise.reject(error);
        }

        const response = await axiosInstance.post(`/auth/refresh-token`, { refreshToken });
        const newAccessToken = response.data.accessToken;

        useAuthStore.getState().setToken(newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axios(originalRequest);

      } catch (err) {
        // window.location.href = '/login';
        return Promise.reject(err);
      }
    }


    return Promise.reject(error);
  }
);

const startPollingForRefreshToken = async () => {
  try {
    const refreshToken = Cookies.get('refreshToken');

    if (!refreshToken) {
      console.log('No refresh token found');
      return;
    }

   
    const response = await axiosInstance.post('/auth//refresh-token', { refreshToken });

    if (response.status === 200 && response.data.accessToken) {
  
      useAuthStore.getState().setToken(response.data.accessToken);
      console.log('Token refreshed successfully');
    }
  } catch (error) {
    console.log('Error refreshing token via polling', error);
  }
};

if (typeof window !== 'undefined') {
  startPollingForRefreshToken();
}

export default axiosInstance;