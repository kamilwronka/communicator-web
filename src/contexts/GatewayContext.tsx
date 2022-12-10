import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import io, { Socket } from 'socket.io-client';

import { GATEWAY_URL } from 'config/apiConfig';

import { GatewayEvents } from 'enums/gatewayEvents';

import { useAuthToken } from 'hooks/common/useAuthToken';

export type GatewayProviderValue = {
  connected: boolean;
  socket: Socket;
};

type Props = {
  children: React.ReactNode;
};

export const GatewayProvider: React.FC<Props> = props => {
  const token = useAuthToken();
  const socketRef = useRef(undefined as unknown as Socket);

  const [connected, setConnected] = useState(false);

  const setupBaseListeners = useCallback(() => {
    if (token) {
      socketRef.current.on(GatewayEvents.CONNECT, () => {
        socketRef.current.emit(GatewayEvents.IDENTIFY, { token });
      });

      socketRef.current.on(GatewayEvents.IDENTIFY, payload => {
        setConnected(true);
      });

      socketRef.current.on(GatewayEvents.DISCONNECT, () => {
        setConnected(false);
      });
    }
  }, [token]);

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
