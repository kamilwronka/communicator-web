import { useCallback, useMemo } from 'react';

import { matchPath, useLocation } from 'react-router-dom';
import useSWR from 'swr';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from './useAuthToken';
import { User } from './useUserData';

export enum PrivateChannelType {
  PRIVATE = 'PRIVATE',
}

export type TPrivateChannel = {
  id: string;
  server_id?: any;
  users: User[];
  type: PrivateChannelType;
};

export const usePrivateChannels = () => {
  const token = useAuthToken();
  const location = useLocation();
  const channelPath = matchPath(
    { path: '/channels/@me/:channelId' },
    location.pathname,
  );
  const channelId = channelPath?.params.channelId;

  const fetcher = useCallback(
    () =>
      apiClient<TPrivateChannel[]>('/channels/me', {
        method: 'GET',
        token,
      }),
    [token],
  );

  const { data, error, mutate } = useSWR(
    token ? `/channels/me` : null,
    fetcher,
  );

  const selectedChannel = useMemo(
    () => data?.find(channel => channel.id === channelId),
    [channelId, data],
  );

  return { data, error, mutate, selectedChannel, channelId: channelId };
};
