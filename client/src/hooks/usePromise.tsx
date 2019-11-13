import { useState, useEffect } from 'react';

const usePromise = (promise?: Promise<any>) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const race = async (promise: Promise<any>, onSuccess?: Function, onError?: Function): Promise<any> => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await promise;
      setData(res);
      setIsLoading(false);
      if (onSuccess) {
        await onSuccess(res);
      } else {
        return res;
      }
    } catch (e) {
      if (!onError) {
        if (e.response && e.response.data.error_description) {
          setError(e.response.data.error_description);
        } else {
          console.log('Axios error', e);
          setError('Une erreur est survenue');
        }
        setIsLoading(false);
        throw e;
      } else {
        onError(e);
      }
    }
  };

  useEffect(() => {
    if (promise) race(promise);
  }, []);

  return {
    response: data,
    isLoading,
    error,
    race
  };
};

export default usePromise;
