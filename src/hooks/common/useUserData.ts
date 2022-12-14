import { useCallback } from 'react';

import useSWR from 'swr';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from './useAuthToken';

export type TUser = {
  user_id: string;
  email: string;
  profile_created: boolean;
  username: string;
  profile_picture_url: string;
};

export const useUser = () => {
  const token = useAuthToken();

  const fetcher = useCallback(
    () => apiClient<TUser>('/users/me', { method: 'GET', token }),
    [token],
  );

  const { data, error, mutate } = useSWR(token ? `/users/me` : null, fetcher);

  return { data, error, mutate };
};
