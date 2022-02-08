import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useAddOrders = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    { method: 'POST' },
    { manual: true }
  );

  const execute = () => {
    return fire({ url: `${REACT_APP_API}/order` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
