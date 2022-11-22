import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { AppNavigation } from 'components/Navigation';

export const Layout: React.FC = () => {
  return (
    <Flex direction="row" h="100vh" width="100%">
      <AppNavigation />
      <Box flex="1">
        <Outlet />
      </Box>
    </Flex>
  );
};
