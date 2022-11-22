import { Route, Routes } from 'react-router-dom';

import { ChannelView } from './components/ChannelView/ChannelView';
import { Layout } from './components/Layout';
import { NoTextChannelsView } from './components/NoTextChannelsView';

const Server: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/:channelId" element={<ChannelView />} />
        <Route path="/" element={<NoTextChannelsView />} />
      </Route>
    </Routes>
  );
};

export default Server;
