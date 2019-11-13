import axios from 'axios';
import { AUTH_TOKEN } from '../constants';

const Axios = axios.create({
  responseType: 'json'
});

if (localStorage.getItem(AUTH_TOKEN)) {
  Axios.defaults.headers = {
    Authorization: 'Bearer ' + localStorage.getItem(AUTH_TOKEN)
  };
}

Axios.interceptors.request.use(
  config => {
    if (localStorage.getItem(AUTH_TOKEN)) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem(AUTH_TOKEN);
    }
    return config;
  },
  error => Promise.reject(error)
);

export default Axios;
