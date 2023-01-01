import { useCallback, useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { AxiosError } from 'axios';
import useSWR from 'swr';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from './useAuthToken';

export type User = {
  id: string;
  email?: string;
  username: string;
  avatar: string;
};

export const useUser = () => {
  const token = useAuthToken();
  const { logout } = useAuth0();

  const fetcher = useCallback(
    () => apiClient<User>('/users/me', { method: 'GET', token }),
    [token],
  );

  const { data, error, mutate } = useSWR(token ? `/users/me` : null, fetcher);

  useEffect(() => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        logout();
      }
    }
  }, [error, logout]);

  return { data, error, mutate };
};
