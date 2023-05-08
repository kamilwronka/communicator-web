import { useCallback, useEffect } from 'react';

import { Route, Routes, useParams } from 'react-router-dom';

import { ChannelView } from './components/ChannelView/ChannelView';
import { Layout } from './components/Layout';
import { NoTextChannelsView } from './components/NoTextChannelsView';

import { GatewayEvents } from 'enums/gatewayEvents';

import { useGateway } from 'hooks/api/useGateway';

export const Server: React.FC = () => {
  // const { serverId } = useParams();
  // const { socket, connected } = useGateway();

  // const setupListeners = useCallback(() => {
  //   socket.on(GatewayEvents.SERVER_JOIN, payload => {
  //     if (payload.status === 'ok') {
  //       // todo some lodżik
  //     }
  //   });
  // }, [socket]);

  // const removeListeners = useCallback(() => {
  //   socket.off(GatewayEvents.SERVER_JOIN);
  // }, [socket]);

  // const emitInitialEvents = useCallback(() => {
  //   socket.emit(GatewayEvents.SERVER_JOIN, { serverIds: [serverId] });
  // }, [serverId, socket]);

  // useEffect(() => {
  //   if (connected && serverId) {
  //     setupListeners();
  //     emitInitialEvents();
  //   }

  //   return () => {
  //     if (socket) {
  //       removeListeners();
  //     }
  //   };
  // }, [
  //   serverId,
  //   connected,
  //   socket,
  //   setupListeners,
  //   emitInitialEvents,
  //   removeListeners,
  // ]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/:channelId" element={<ChannelView />} />
        <Route path="/" element={<NoTextChannelsView />} />
      </Route>
    </Routes>
  );
};
