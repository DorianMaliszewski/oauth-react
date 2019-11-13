import { AxiosRequestConfig, Method } from 'axios';
import { AUTH_TOKEN } from '../constants';
import Axios from './Axios';

export class UserApiConfig {
  static findAllConfig = {
    method: 'GET' as Method,
    url: 'http://localhost:8081/api/users'
  } as AxiosRequestConfig;
}

export class UserApi {
  static findMyInformation = Axios.get('http://localhost:8081/api/users/me');
}
