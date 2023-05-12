import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { CreateCategoryModal } from './CreateCategoryModal/CreateCategoryModal';
import { CreateChannelModal } from './CreateChannelModal/CreateChannelModal';
import { InviteModal } from './InviteModal/InviteModal';
import { ServerSettingsModal } from './ServerSettingsModal/ServerSettingsModal';
import { Sidebar } from './Sidebar';

export const Layout: React.FC = () => {
  return (
    <>
      <Flex direction="row" h="100vh" width="100%">
        <Sidebar />
        <Box flex="1" bg="gray.700">
          <Outlet />
        </Box>
      </Flex>
      <CreateCategoryModal />
      <CreateChannelModal />
      <InviteModal />
      <ServerSettingsModal />
    </>
  );
};
