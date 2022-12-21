import React from 'react';

import { Box, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { FaUserFriends } from 'react-icons/fa';
import { Link, useLocation, useParams } from 'react-router-dom';

import { SearchInput } from 'components';
import { AvatarWithStatus } from 'components/Avatar';

import { useUser } from 'hooks/api/useUserData';
import { usePrivateChannels } from 'hooks/usePrivateChannels';

import { DirectMessagesItem } from './DirectMessagesItem';

export const DirectMessages: React.FC = () => {
  const { data: privateChannels } = usePrivateChannels();
  const { data: userData } = useUser();
  const { channelId } = useParams();
  const { pathname } = useLocation();

  return (
    <Flex flex="1" direction="column">
      <Box
        height="16"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        px="4"
      >
        <SearchInput bg="gray.700" placeholder="Search for conversation" />
      </Box>
      <Divider />
      <Stack spacing="8" flex="1" overflow="auto" px="4" mt="4">
        <DirectMessagesItem
          label="Friends"
          icon={<FaUserFriends />}
          active={pathname === '/channels/@me'}
        />
        <Box>
          <Text
            px="3"
            fontSize="xs"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="widest"
            color="gray.500"
            mb="3"
          >
            DIRECT MESSAGES
          </Text>
          <Stack spacing="1" px="2">
            {privateChannels?.map(channel => {
              const desiredUser = channel.users?.find(user => {
                return user.id !== userData?.id;
              });

              const active = channelId === channel.id;

              if (channel.type !== 'PRIVATE') {
                return null;
              }

              const href = `/channels/@me/${channel.id}`;

              return (
                <Link to={href ? href : '/channels/@me'} key={channel.id}>
                  <Stack
                    w="full"
                    cursor="pointer"
                    userSelect="none"
                    rounded="md"
                    px="4"
                    py="2"
                    transition="all 0.2s"
                    bg={active ? 'gray.700' : undefined}
                    _hover={{ bg: 'gray.700' }}
                    _active={{ bg: 'gray.600' }}
                    direction="row"
                  >
                    <Box>
                      <AvatarWithStatus
                        status="online"
                        name={desiredUser?.username}
                        src={desiredUser?.profilePictureUrl}
                      />
                    </Box>
                    <Box display="flex" alignItems="center" pl="2">
                      <Text fontSize="md" fontWeight="semibold">
                        {desiredUser?.username}
                      </Text>
                    </Box>
                  </Stack>
                </Link>
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
