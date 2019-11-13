import Axios from 'axios';
import { OAUTH_BASE_URL } from '../constants';

export default {
  loginAction: (username: string, password: string): Promise<any> => {
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', password);
    return Axios.request({
      url: OAUTH_BASE_URL + '/oauth/token',
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa('test:test'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    });
  }
};
