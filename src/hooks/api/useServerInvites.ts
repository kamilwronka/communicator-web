import { useCallback } from 'react';

import useSWR from 'swr';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from './useAuthToken';
import { useServers } from './useServers';
import { User } from './useUserData';

export type TInviteServer = {
  id: string;
  name: string;
  server_image_url: string;
};

export type TServerInvite = {
  id: string;
  maxAge: number;
  maxUses: number;
  server: TInviteServer;
  inviter: User;
};

export const useServerInvites = () => {
  const { serverId } = useServers();
  const token = useAuthToken();

  const fetcher = useCallback(
    () =>
      apiClient<TServerInvite[]>(`/servers/${serverId}/invites`, {
        method: 'GET',
        token,
      }),
    [token, serverId],
  );

  const { data, error, mutate } = useSWR(
    token && serverId ? `/servers/${serverId}/invites` : null,
    fetcher,
  );

  return { data, error, mutate };
};
