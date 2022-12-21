import { useCallback } from 'react';

import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from './useAuthToken';

export enum ServerChannelType {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
  PARENT = 'PARENT',
}

export type ServerChannel = {
  id: string;
  serverId: any;
  type: ServerChannelType;
  name: string;
  children: ServerChannel[];
  parentId?: string;
};

export const useServerChannels = () => {
  const token = useAuthToken();
  const { serverId, channelId } = useParams();

  const fetcher = useCallback(
    () =>
      apiClient<ServerChannel[]>(`/channels?serverId=${serverId}`, {
        method: 'GET',
        token,
      }),
    [token, serverId],
  );

  const { data, error, mutate } = useSWR(
    token && serverId ? `/channels?serverId=${serverId}` : null,
    fetcher,
    { fallbackData: [] },
  );

  const selectedChannel = data?.find(channel => channel.id === channelId);
  const isLoading = !data && !error;

  return { data, error, mutate, selectedChannel, channelId, isLoading };
};
