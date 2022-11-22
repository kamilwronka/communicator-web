import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

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
    </>
  );
};
