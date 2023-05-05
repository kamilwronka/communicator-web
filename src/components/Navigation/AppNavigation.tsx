import { Center, Divider, Flex, VStack } from '@chakra-ui/react';
import { matchPath, useLocation } from 'react-router-dom';

import { CDN_URL } from '../../config/cdn';

import { useUser } from 'hooks/api/useUserData';

import { AddServerButton } from './AddServerButton';
import { NavigationItem } from './NavigationItem';
import { ServerNavigation } from './ServerNavigation';

export const AppNavigation: React.FC = () => {
  const { pathname } = useLocation();
  const matchingPath = matchPath({ path: '/channels/@me/*' }, pathname);
  const { data: userData } = useUser();

  const avatarSrc = userData?.avatar ? `${CDN_URL}/${userData?.avatar}` : '';

  return (
    <Flex width="24" minWidth="24" bg="gray.900" direction="column">
      <Flex h="16" alignItems="center" justifyContent="center">
        <NavigationItem
          href="/channels/@me"
          name={userData?.username}
          src={avatarSrc}
          isActive={matchingPath?.pathnameBase === '/channels/@me'}
        />
      </Flex>
      <Center>
        <Divider w="12" />
      </Center>
      <VStack
        spacing="1"
        overflowY="auto"
        marginTop="1"
        sx={{
          '&::-webkit-scrollbar-track': {
            bg: 'whiteAlpha.100',
            borderRadius: '20px',
          },
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            bg: 'gray.900',
            borderRadius: '20px',
          },
        }}
      >
        <ServerNavigation />
      </VStack>
      <Flex h="16" alignItems="center" justifyContent="center">
        <AddServerButton />
      </Flex>
    </Flex>
  );
};
