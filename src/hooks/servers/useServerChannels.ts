import { useCallback } from 'react';

import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { ChannelType } from 'types/channel';

import { NavigationParams } from 'navigation/types';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from '../common/useAuthToken';

export type ServerChannel = {
  _id: string;
  serverId: any;
  type: ChannelType;
  name: string;
  children: ServerChannel[];
  parentId?: string;
};

export const useServerChannels = () => {
  const token = useAuthToken();
  const { serverId, channelId } = useParams<NavigationParams>();

  const fetcher = useCallback(
    () =>
      apiClient<ServerChannel[]>(`/servers/${serverId}/channels`, {
        method: 'GET',
        token,
      }),
    [token, serverId],
  );

  const { data, error, mutate } = useSWR(
    token && serverId ? `/servers/${serverId}/channels` : null,
    fetcher,
    { fallbackData: [] },
  );

  const selectedChannel = data?.find(channel => channel._id === channelId);
  const isLoading = !data && !error;

  return { data, error, mutate, selectedChannel, channelId, isLoading };
};
