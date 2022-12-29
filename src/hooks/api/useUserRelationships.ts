import { useCallback } from 'react';

import useSWR from 'swr';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from './useAuthToken';
import { User } from './useUserData';

export enum ERelationshipType {
  ACCEPTED = 'accepted',
  SENT_PENDING = 'sent_pending',
  RECEIVED_PENDING = 'received_pending',
  DECLINED = 'declined',
}

export type TUserRelationship = {
  id: number;
  type: ERelationshipType;
  user: User;
};

export const useUserRelationships = () => {
  const token = useAuthToken();

  const fetcher = useCallback(
    () =>
      apiClient<TUserRelationship[]>('/users/me/relationships', {
        method: 'GET',
        token,
      }),
    [token],
  );

  const { data, error, mutate } = useSWR(
    token ? `/users/me/relationships` : null,
    fetcher,
  );

  return { data, error, mutate };
};
