import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';

import { ChannelView } from './components/ChannelView/ChannelView';
import { Layout } from './components/Layout';
import { NoTextChannelsView } from './components/NoTextChannelsView';

import { GatewayEvents } from 'enums/gatewayEvents';

import { useAuthToken } from '../../hooks/common/useAuthToken';
import { useGateway } from 'hooks/useGateway';

import { Member, init } from './store/membersSlice';

import { apiClient } from '../../utils/apiClient';

export const Server: React.FC = () => {
  const { serverId } = useParams();
  const { socket, connected } = useGateway();
  const token = useAuthToken();
  const dispatch = useDispatch();

  const setupListeners = useCallback(() => {
    socket.on(GatewayEvents.SERVER_JOIN, payload => {
      if (payload.status === 'ok') {
        // todo some lodżik
      }
    });
  }, [socket]);

  const removeListeners = useCallback(() => {
    socket.off(GatewayEvents.SERVER_JOIN);
  }, [socket]);

  const emitInitialEvents = useCallback(() => {
    socket.emit(GatewayEvents.SERVER_JOIN, { serverId });
  }, [serverId, socket]);

  useEffect(() => {
    if (connected && serverId) {
      setupListeners();
      emitInitialEvents();
    }

    return () => {
      if (socket) {
        removeListeners();
      }
    };
  }, [
    serverId,
    connected,
    socket,
    setupListeners,
    emitInitialEvents,
    removeListeners,
  ]);

  useEffect(() => {
    if (token && serverId) {
      apiClient<Member[]>(`/servers/${serverId}/members`, {
        method: 'GET',
        token,
      }).then(r => dispatch(init({ serverId, members: r })));
    }
  }, [token, serverId, dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/:channelId" element={<ChannelView />} />
        <Route path="/" element={<NoTextChannelsView />} />
      </Route>
    </Routes>
  );
};
