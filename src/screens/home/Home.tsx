import { Route, Routes } from 'react-router-dom';

import { Chat } from './components/Chat/Chat';
import { Layout } from './components/Layout';
import { Relationships } from './components/Relationships/Relationships';

export const Home: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/:channelId" element={<Chat />} />
        <Route path="/" element={<Relationships />} />
      </Route>
    </Routes>
  );
};
