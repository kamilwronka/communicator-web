import { useCallback } from 'react';

import useSWR from 'swr';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from '../common/useAuthToken';
import { TUser } from '../common/useUserData';
import { useServers } from './useServers';

export type TInviteServer = {
  id: string;
  name: string;
  server_image_url: string;
};

export type TServerInvite = {
  _id: string;
  max_age: number;
  max_uses: number;
  server: TInviteServer;
  inviter: TUser;
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
