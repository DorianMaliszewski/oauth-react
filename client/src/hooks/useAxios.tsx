import { useState, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';
import Axios from '../api/Axios';

const useAxios = (requestConfig: AxiosRequestConfig, autoLaunch: boolean = false, authToken?: string | null) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [token, setToken] = useState(authToken);

  const launchRequest = async (body?: any) => {
    try {
      setIsLoading(true);
      setError(null);
      let config = { ...requestConfig };
      if (token) {
        if (config.headers) {
          config.headers.Authorization = 'Bearer ' + authToken;
        } else {
          config.headers = {
            Authorization: 'Bearer ' + authToken
          };
        }
      }
      const res = await Axios.request({ ...config, data: body });
      setData(res.data);
      setIsLoading(false);
      return res;
    } catch (e) {
      console.log(JSON.stringify(e.reponse));
      if (e.response && e.response.data.error_description) {
        setError(e.response.data.error_description);
      } else {
        console.log('Axios error', e);
        setError('Une erreur est survenue');
      }
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    if (autoLaunch) launchRequest();
  }, [requestConfig]);

  return {
    response: data,
    isLoading,
    error,
    launchRequest
  };
};

export default useAxios;
