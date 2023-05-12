import { useCallback } from 'react';

import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from './useAuthToken';
import { Server } from './useServers';

export const useServerData = () => {
  const token = useAuthToken();
  const { serverId } = useParams();

  const fetcher = useCallback(
    () =>
      apiClient<Server>(`/servers/${serverId}`, {
        method: 'GET',
        token,
      }),
    [token, serverId],
  );

  const { data, error, mutate } = useSWR(
    token && serverId ? `/servers/${serverId}` : null,
    fetcher,
  );

  return { data, error, mutate, serverId };
};
