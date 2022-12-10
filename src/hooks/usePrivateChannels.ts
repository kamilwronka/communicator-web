import { useCallback, useMemo } from 'react';

import { matchPath, useLocation } from 'react-router-dom';
import useSWR from 'swr';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from './common/useAuthToken';

type ChannelUser = {
  id: string;
  profilePictureUrl: string;
  username: string;
};

export type TPrivateChannel = {
  id: string;
  server_id?: any;
  type: string;
  users: ChannelUser[];
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
      apiClient<TPrivateChannel[]>('/users/me/channels', {
        method: 'GET',
        token,
      }),
    [token],
  );

  const { data, error, mutate } = useSWR(
    token ? `/users/me/channels` : null,
    fetcher,
  );

  const selectedChannel = useMemo(
    () => data?.find(channel => channel.id === channelId),
    [channelId, data],
  );

  return { data, error, mutate, selectedChannel, channelId: channelId };
};
