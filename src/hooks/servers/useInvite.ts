import { useCallback } from 'react';

import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from '../common/useAuthToken';
import { TUser } from '../common/useUserData';

export type TInviteServer = {
  id: string;
  name: string;
  server_image_url: string;
};

export type TInvite = {
  _id: string;
  max_age: number;
  max_uses: number;
  server: TInviteServer;
  inviter: TUser;
};

export const useInvite = () => {
  const { inviteId } = useParams();
  const token = useAuthToken();

  const fetcher = useCallback(
    () =>
      apiClient<TInvite>(`/servers/invites/${inviteId}`, {
        method: 'GET',
        token,
      }),
    [token, inviteId],
  );

  const { data, error, mutate } = useSWR(
    token && inviteId ? `/servers/invites/${inviteId}` : null,
    fetcher,
  );

  return { data, error, mutate };
};
