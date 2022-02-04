import useAxios from 'axios-hooks';

export const useOrder = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (orderId: string) => {
    return fire({ url: `http://localhost:5000/order/${orderId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
