import { useEffect, useState } from 'react';

import { Spinner } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useServers } from 'hooks/api/useServers';
import { useUser } from 'hooks/api/useUserData';

import { Box, BoxProps } from '@chakra-ui/layout';

const MotionBox = motion<BoxProps>(Box);

export const Loading: React.FC = () => {
  const [isOpen, toggleLoadingScreen] = useState(true);
  const { data: user } = useUser();
  const { data: servers } = useServers();

  const isUser = !isEmpty(user);
  const hasServers = !isNil(servers);

  useEffect(() => {
    if (isUser && hasServers) {
      toggleLoadingScreen(false);
    } else {
      toggleLoadingScreen(true);
    }
  }, [isUser, hasServers]);

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionBox
          bg="gray.800"
          zIndex={99999}
          position="absolute"
          h="100vh"
          w="100vw"
          alignItems="center"
          justifyContent="center"
          display="flex"
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: '0.2' }}
        >
          <Spinner size="xl" color="white" />
        </MotionBox>
      )}
    </AnimatePresence>
  );
};
