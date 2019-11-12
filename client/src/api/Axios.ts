import axios from 'axios';
import { AUTH_TOKEN } from '../constants';

const Axios = axios.create({
  responseType: 'json'
});

if (localStorage.getItem(AUTH_TOKEN)) {
  Axios.defaults.headers = {
    Authorization: 'Bearer' + localStorage.getItem(AUTH_TOKEN)
  };
}

export default Axios;
