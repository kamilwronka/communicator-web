import { useCallback } from 'react';

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

  const fetcher = useCallback(
    () => apiClient<User>('/users/me', { method: 'GET', token }),
    [token],
  );

  const { data, error, mutate } = useSWR(token ? `/users/me` : null, fetcher);

  return { data, error, mutate };
};
