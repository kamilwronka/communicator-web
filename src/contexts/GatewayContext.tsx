import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import isEmpty from 'lodash/isEmpty';
import io, { Socket } from 'socket.io-client';

import { GATEWAY_URL } from 'config/apiConfig';

import { useAuthToken } from 'hooks/common/useAuthToken';
import { useUser } from 'hooks/common/useUserData';
import { useServerChannels } from 'hooks/servers/useServerChannels';
import { useServers } from 'hooks/servers/useServers';

export enum EBaseWsEvents {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  JOIN = 'join',
}

export type TWebsocketProviderValue = {
  connected: boolean;
  socket: Socket;
};

export const GatewayContext = createContext<TWebsocketProviderValue>(
  {} as TWebsocketProviderValue,
);
GatewayContext.displayName = 'GatewayContext';

const WEBSOCKET_GATEWAY_URL = GATEWAY_URL;

export const GatewayProvider: React.FC<{
  children: React.ReactNode;
}> = props => {
  const { data: servers } = useServers();
  const token = useAuthToken();
  const { data: user } = useUser();
  // const {channelId: privateChannelId} = usePrivateChannels();
  const { channelId: serverChannelId } = useServerChannels();
  const prevChannel = useRef('');
  const prevServersIds = useRef<string[]>([]);
  const socketRef = useRef({} as Socket);

  const [connected, setConnected] = useState(false);

  const serversIds = useMemo(() => {
    return servers?.map(server => server._id);
  }, [servers]);

  const setupInitialEvents = useCallback(
    (socket: Socket) => {
      if (user?.user_id) {
        socket.on(EBaseWsEvents.CONNECT, () => {
          // join private channel

          socket.on('join', payload => {
            console.log(payload);
          });

          socket.on('leave', payload => {
            console.log(payload);
          });

          setConnected(socket.connected);
        });

        socket.on(EBaseWsEvents.DISCONNECT, () => {
          setConnected(socket.connected);
        });
      }
    },
    [user?.user_id],
  );

  useEffect(() => {
    if (token) {
      const socket = io(WEBSOCKET_GATEWAY_URL, {
        transports: ['websocket'],
        query: { token },
      });

      setupInitialEvents(socket);
      socketRef.current = socket;
    }

    return () => {
      socketRef.current.close?.();
    };
  }, [token, setupInitialEvents]);

  useEffect(() => {
    console.log('Connected: ', connected);
  }, [connected]);

  useEffect(() => {
    const channelId = serverChannelId;

    if (connected && channelId) {
      if (!isEmpty(prevChannel.current)) {
        socketRef.current.emit('leave', prevChannel.current);
      }

      socketRef.current.emit('join', channelId);
      prevChannel.current = channelId;
    }
  }, [connected, serverChannelId]);

  useEffect(() => {
    if (connected && !isEmpty(serversIds)) {
      const intersection = serversIds?.filter(
        x => !prevServersIds.current.includes(x),
      );

      const reverseIntersection = prevServersIds.current.filter(
        x => !serversIds?.includes(x),
      );

      if (!isEmpty(intersection)) {
        socketRef.current.emit('join', intersection);
      }

      if (!isEmpty(reverseIntersection)) {
        socketRef.current.emit('leave', intersection);
      }

      prevServersIds.current = serversIds ? serversIds : [];
    }
  }, [connected, serversIds]);

  const value: TWebsocketProviderValue = {
    socket: socketRef.current,
    connected,
  };

  return (
    <GatewayContext.Provider value={value} {...props}>
      {props.children}
    </GatewayContext.Provider>
  );
};
