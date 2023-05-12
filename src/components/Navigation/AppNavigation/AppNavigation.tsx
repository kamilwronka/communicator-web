import { Center, Divider, Flex, VStack } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { matchPath, useLocation } from 'react-router-dom';

import { CDN_URL } from '../../../config/cdn';

import { useServers } from '../../../hooks/api/useServers';
import { useUser } from 'hooks/api/useUserData';

import { AddServerButton } from './AddServerButton';
import { AppNavigationItem } from './AppNavigationItem';

export const AppNavigation: React.FC = () => {
  const { pathname } = useLocation();
  const matchingPath = matchPath({ path: '/channels/@me/*' }, pathname);
  const { data: userData } = useUser();
  const { data: servers } = useServers();

  const avatarSrc = userData?.avatar ? `${CDN_URL}/${userData?.avatar}` : '';

  return (
    <Flex width="24" minWidth="24" bg="gray.900" direction="column">
      <Flex h="16" alignItems="center" justifyContent="center">
        <AppNavigationItem
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
        {servers?.map(server => {
          const iconSrc = server.icon ? `${CDN_URL}/${server.icon}` : '';

          return (
            <AppNavigationItem
              key={server.id}
              id={server.id}
              name={server.name}
              src={iconSrc}
            />
          );
        })}
        {!isEmpty(servers) && (
          <Center mt="2">
            <Divider w="12" />
          </Center>
        )}
      </VStack>
      <Flex h="16" alignItems="center" justifyContent="center">
        <AddServerButton />
      </Flex>
    </Flex>
  );
};
