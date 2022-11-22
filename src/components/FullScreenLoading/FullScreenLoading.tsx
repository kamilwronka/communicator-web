import { Spinner } from '@chakra-ui/react';

import { Box } from '@chakra-ui/layout';

export const FullScreenLoading: React.FC = () => {
  return (
    <Box
      bg="gray.800"
      zIndex={99999}
      position="absolute"
      h="100vh"
      w="100vw"
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      <Spinner size="xl" color="white" />
    </Box>
  );
};
