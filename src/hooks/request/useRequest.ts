import useAxios from 'axios-hooks';
import { RequestGetDto } from 'models/RequestGetDto';

export const useRequest = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (requestId: string) => {
    return fire({ url: `http://localhost:5000/request/${requestId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
