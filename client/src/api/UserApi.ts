import { AxiosRequestConfig, Method } from 'axios';
import { AUTH_TOKEN, OAUTH_BASE_URL } from '../constants';
import Axios from './Axios';

export class UserApiConfig {
  static findAllConfig = {
    method: 'GET' as Method,
    url: OAUTH_BASE_URL + '/api/users'
  } as AxiosRequestConfig;
}

export class UserApi {
  public findMyInformation = () => Axios.get(OAUTH_BASE_URL + '/api/users/me', { headers: { Authorization: 'Bearer ' + localStorage.getItem(AUTH_TOKEN) } });
  private static INSTANCE = new UserApi();
  static getInstance() {
    return this.INSTANCE;
  }
}
