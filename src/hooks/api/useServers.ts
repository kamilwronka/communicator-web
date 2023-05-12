import { useCallback, useMemo } from 'react';

import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from './useAuthToken';
import { ServerChannel } from './useServerChannels';

export type Server = {
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
  const { serverId } = useParams();

  const fetcher = useCallback(
    () => apiClient<Server[]>('/servers', { method: 'GET', token }),
    [token],
  );

  const { data, error, mutate } = useSWR(token ? `/servers` : null, fetcher);

  const selectedServer = useMemo(
    () => data?.find(server => server.id === serverId),
    [serverId, data],
  );

  return { data, error, mutate, selectedServer, serverId };
};
