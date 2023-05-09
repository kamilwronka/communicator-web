import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { emitter } from 'eventEmitter';
import io, { Socket } from 'socket.io-client';

import { GATEWAY_URL } from 'config/apiConfig';

import { GatewayEvents } from 'enums/gatewayEvents';

import { usePrivateChannels } from '../hooks/api/usePrivateChannels';
import { useServers } from '../hooks/api/useServers';
import { useAuthToken } from 'hooks/api/useAuthToken';

export type GatewayProviderValue = {
  connected: boolean;
  socket: Socket;
};

type Props = {
  children: React.ReactNode;
};

export const GatewayProvider: React.FC<Props> = props => {
  const token = useAuthToken();
  const { data: servers } = useServers();
  const socketRef = useRef(undefined as unknown as Socket);
  const { data: channels } = usePrivateChannels();

  const [connected, setConnected] = useState(false);
  const serverIds = useMemo(
    () => (servers ? servers?.map(server => server.id) : null),
    [servers],
  );
  const channelIds = useMemo(
    () => (channels ? channels?.map(channel => channel.id) : null),
    [channels],
  );

  const setupBaseListeners = useCallback(() => {
    if (token && serverIds) {
      socketRef.current.on(GatewayEvents.CONNECT, () => {
        socketRef.current.emit(GatewayEvents.IDENTIFY, { token });
      });

      socketRef.current.on(GatewayEvents.IDENTIFY, payload => {
        console.log(payload);
        socketRef.current.emit(GatewayEvents.SERVER_JOIN, {
          serverIds,
          channelIds,
        });
        setConnected(true);
      });

      socketRef.current.on(GatewayEvents.SERVER_JOIN, payload => {
        console.log(payload);
        // setConnected(true);
        socketRef.current.on(GatewayEvents.SERVER_MESSAGE_SEND, payload => {
          console.log('handling main event', payload);
          emitter.emit(GatewayEvents.SERVER_MESSAGE_SEND, payload);
        });

        socketRef.current.on(GatewayEvents.DIRECT_MESSAGE_SEND, payload => {
          console.log('handling main event', payload);
          emitter.emit(GatewayEvents.DIRECT_MESSAGE_SEND, payload);
        });
      });

      socketRef.current.on(GatewayEvents.DISCONNECT, () => {
        setConnected(false);
      });
    }
  }, [token, serverIds]);

  useEffect(() => {
    if (token) {
      const socket = io(GATEWAY_URL, {
        transports: ['websocket'],
      });
      socketRef.current = socket;

      setupBaseListeners();
    }

    return () => {
      socketRef.current?.close?.();
    };
  }, [token, setupBaseListeners]);

  useEffect(() => {
    console.log('Connected to gateway: ', connected);

    // socketRef.current.on(GatewayEvents.SERVER_MESSAGE_SEND, payload => {
    //   console.log(payload);
    // });
  }, [connected]);

  const value: GatewayProviderValue = {
    socket: socketRef.current,
    connected,
  };

  return (
    <GatewayContext.Provider value={value} {...props}>
      {props.children}
    </GatewayContext.Provider>
  );
};

export const GatewayContext = createContext<GatewayProviderValue>(
  {} as GatewayProviderValue,
);
GatewayContext.displayName = 'GatewayContext';
