import { useCallback } from 'react';

import useSWR from 'swr';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from './useAuthToken';
import { User } from './useUserData';

export enum ERelationshipType {
  ACCEPTED = 'ACCEPTED',
  SENT_PENDING = 'SENT_PENDING',
  RECEIVED_PENDING = 'RECEIVED_PENDING',
  DECLINED = 'DECLINED',
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
