import { useEffect, useReducer, useRef, useState } from 'react';

import { CHAT_MESSAGES_FETCH_LIMIT } from 'config/chat';

import { apiClient } from 'utils/apiClient';

import { useAuthToken } from './common/useAuthToken';

export interface Author {
  id: string;
  username: string;
  avatar: string;
}

export type Attachment =
  | {
      url: string;
      id: string;
      mimeType: string;
    }
  | File;

export type TChatMessage = {
  id?: string;
  nonce: string;
  attachments?: Attachment[];
  author: Author;
  channel_id?: string;
  content: string;
  mention_everyone?: boolean;
  mention_roles?: string[];
  mentions?: Author[];
  createdAt: string;
};

type TState = {
  messages: TChatMessage[];
  loading: boolean;
  error: unknown;
  finished: boolean;
};

export enum EActionType {
  FETCH_INIT = 'fetchInit',
  FETCH_SUCCESS = 'fetchSuccess',
  FETCH_FAILURE = 'fetchFailure',
  ADD_OR_UPDATE = 'addOrUpdate',
  SET_FINISHED = 'setFinished',
  CLEAR = 'clear',
}

type TAction =
  | { type: EActionType.FETCH_INIT }
  | { type: EActionType.FETCH_SUCCESS; payload: TChatMessage[] }
  | { type: EActionType.FETCH_FAILURE; payload: Error }
  | { type: EActionType.ADD_OR_UPDATE; payload: TChatMessage }
  | { type: EActionType.SET_FINISHED }
  | { type: EActionType.CLEAR };

const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case EActionType.FETCH_INIT:
      return { ...state, loading: true };
    case EActionType.FETCH_SUCCESS:
      return {
        ...state,
        messages: [...action.payload, ...state.messages],
        loading: false,
      };
    case EActionType.FETCH_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case EActionType.ADD_OR_UPDATE:
      let isUpdated = false;
      const mappedMessages = state.messages.map(msg => {
        if (msg.nonce === action.payload.nonce) {
          isUpdated = true;
          return action.payload;
        }

        return msg;
      });
      return {
        ...state,
        messages: [...mappedMessages, ...(isUpdated ? [] : [action.payload])],
      };
    case EActionType.SET_FINISHED:
      return { ...state, finished: true };
    case EActionType.CLEAR:
      return { ...INITIAL_STATE };
    default:
      return { ...state };
  }
};

const INITIAL_STATE: TState = {
  messages: [],
  loading: false,
  error: null,
  finished: false,
};

export const useInfiniteChatMessages = (id: string | undefined) => {
  const token = useAuthToken();
  const [page, setPage] = useState(0);

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const firstMessageId = useRef<string | undefined>(undefined);

  useEffect(() => {
    firstMessageId.current = undefined;
    dispatch({ type: EActionType.CLEAR });
  }, [id]);

  useEffect(() => {
    firstMessageId.current =
      state.messages.length > 0 ? state.messages[0].id : '';
  }, [state.messages]);

  useEffect(() => {
    if (token && id) {
      const query = new URLSearchParams();
      query.set('limit', `${CHAT_MESSAGES_FETCH_LIMIT}`);
      if (page >= 1 && firstMessageId.current) {
        query.set('before', firstMessageId.current);
      }

      dispatch({ type: EActionType.FETCH_INIT });

      apiClient<TChatMessage[]>(`/channels/${id}/messages?${query}`, {
        method: 'GET',
        token,
      })
        .then(response => {
          response.length < CHAT_MESSAGES_FETCH_LIMIT &&
            dispatch({ type: EActionType.SET_FINISHED });

          dispatch({ type: EActionType.FETCH_SUCCESS, payload: response });
        })
        .catch(error => {
          dispatch({ type: EActionType.FETCH_FAILURE, payload: error });
        });
    }
  }, [page, token, id]);

  console.log(state.loading);

  return {
    messages: state.messages,
    setPage,
    page,
    dispatch,
    finished: state.finished || !!state.error,
    loading: state.loading,
  };
};
