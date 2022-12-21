import { useCallback } from 'react';

import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from './useAuthToken';
import type { User } from './useUserData';

export type ServerMember = {
  id: string;
  user: User;
};

export const useServerMembers = () => {
  const token = useAuthToken();
  const { serverId } = useParams();

  const fetcher = useCallback(
    () =>
      apiClient<ServerMember[]>(`/servers/${serverId}/members`, {
        method: 'GET',
        token,
      }),
    [token, serverId],
  );

  const { data, error, mutate } = useSWR(
    token && serverId ? `/servers/${serverId}/members` : null,
    fetcher,
  );

  return { data, error, mutate, serverId };
};
