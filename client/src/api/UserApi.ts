import { AxiosRequestConfig, Method } from 'axios';
import { AUTH_TOKEN } from '../constants';

export class UserApiConfig {
  static findAllConfig = {
    method: 'GET' as Method,
    url: 'http://localhost:8081/api/users'
  } as AxiosRequestConfig;
}
