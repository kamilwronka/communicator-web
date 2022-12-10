import { useCallback, useMemo } from 'react';

import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import { NavigationParams } from 'navigation/types';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from '../common/useAuthToken';
import { ServerChannel } from './useServerChannels';

export type TServer = {
  id: string;
  name: string;
  owner_id: string;
  icon: string;
  channels: ServerChannel[];
  members: TServerMember[];
};

export type TServerMember = {
  id: string;
  username: string;
  avatar: string;
};

export const useServers = () => {
  const token = useAuthToken();
  const { serverId } = useParams<NavigationParams>();

  const fetcher = useCallback(
    () => apiClient<TServer[]>('/users/me/servers', { method: 'GET', token }),
    [token],
  );

  const { data, error, mutate } = useSWR(
    token ? `/users/me/servers` : null,
    fetcher,
  );

  const selectedServer = useMemo(
    () => data?.find(server => server.id === serverId),
    [serverId, data],
  );

  return { data, error, mutate, selectedServer, serverId };
};
