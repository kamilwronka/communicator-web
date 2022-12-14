import { useCallback, useMemo } from 'react';

import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import { NavigationParams } from 'navigation/types';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from '../common/useAuthToken';
import { ServerChannel } from './useServerChannels';

export type TServer = {
  _id: string;
  name: string;
  owner_id: string;
  icon: string;
  channels: ServerChannel[];
  members: TServerMember[];
};

export type TServerMember = {
  user_id: string;
  username: string;
  profile_picture_url: string;
};

export const useServers = () => {
  const token = useAuthToken();
  const { serverId } = useParams<NavigationParams>();

  const fetcher = useCallback(
    () => apiClient<TServer[]>('/servers', { method: 'GET', token }),
    [token],
  );

  const { data, error, mutate } = useSWR(token ? `/servers` : null, fetcher);

  const selectedServer = useMemo(
    () => data?.find(server => server._id === serverId),
    [serverId, data],
  );

  return { data, error, mutate, selectedServer, serverId };
};
