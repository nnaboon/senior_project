import useAxios from 'axios-hooks';
import { UsersGetDto } from 'models/UserGetDto';

export type UsersResponse = {
  data: UsersGetDto;
  message: string;
};

export const useUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios<UsersResponse>(
    {},
    { manual: true }
  );

  const execute = (userId: string) => {
    return fire({ url: `http://localhost:5000/user/${userId}` });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
