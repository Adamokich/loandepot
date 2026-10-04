import axios from 'axios';

export const API_ROUTES = {
  modules: '/api/modules',
  reviews: '/api/reviews',
  userRegister: 'users/register',
};

export const client = axios.create({
  baseURL: import.meta.env.BASIC_URL,
  timeout: 10000,
});
