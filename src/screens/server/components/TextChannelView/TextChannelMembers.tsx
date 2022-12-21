import { useState } from 'react';

import { Box, Divider, Flex, Heading } from '@chakra-ui/react';
import { Reorder } from 'framer-motion';
import noop from 'lodash/noop';

import { SearchInput } from 'components';

import { useServerMembers } from 'hooks/api/useServerMembers';

import { TextChannelMember } from './TextChannelMember';

export const TextChannelMembers: React.FC = () => {
  const [, setSearchValue] = useState('');
  const { data: members } = useServerMembers();

  const handleSearchInputChange = (query: string) => {
    setSearchValue(query);
  };

  // const emitInitialEvents = useCallback(() => {
  //   socket.emit(GatewayEvents.SERVER_PRESENCE_REQUEST, { serverId });
  // }, [serverId, socket]);

  // const setupListeners = useCallback(() => {
  //   socket.on(GatewayEvents.SERVER_PRESENCE_REQUEST, (users: Member[]) => {
  //     setOnlineMembers(users);
  //   });

  //   socket.on(GatewayEvents.SERVER_PRESENCE_UPDATE, (user: Member) => {
  //     setOnlineMembers(currentState => {
  //       if (user.status === 'online') {
  //         return [
  //           ...new Map(
  //             [...currentState, user].map((item: any) => [item.id, item]),
  //           ).values(),
  //         ];
  //       }

  //       if (user.status === 'offline') {
  //         return currentState.filter(member => member.id !== user.id);
  //       }

  //       if (user.status === 'afk') {
  //         return currentState.map(member => {
  //           return member.id === user.id ? user : member;
  //         });
  //       }

  //       return currentState;
  //     });
  //   });
  // }, [socket]);

  // const removeListeners = useCallback(() => {
  //   socket.off(GatewayEvents.SERVER_PRESENCE_UPDATE);
  //   socket.off(GatewayEvents.SERVER_PRESENCE_REQUEST);
  // }, [socket]);

  // useEffect(() => {
  //   if (connected) {
  //     setupListeners();
  //     emitInitialEvents();
  //   }

  //   return () => {
  //     if (connected && socket) {
  //       removeListeners();
  //     }
  //   };
  // }, [connected, socket]);

  return (
    <Flex bg="gray.800" w="80" h="full" color="white" flexDir="column">
      <Flex h="16" alignItems="center" px="8">
        <Heading size="md">Members</Heading>
      </Flex>
      <Divider />
      <Box px="4" mt="4">
        <SearchInput
          color="white"
          bg="gray.700"
          debounce={400}
          onSearch={handleSearchInputChange}
          placeholder="Search for member"
        />
      </Box>
      <Flex
        flex="1"
        direction="column"
        px="4"
        my="4"
        overflowY="auto"
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
        <Reorder.Group
          axis="y"
          values={members ? members : []}
          layoutScroll
          style={{ listStyleType: 'none' }}
          onReorder={noop}
        >
          {members?.map(member => {
            return (
              <Reorder.Item
                dragListener={false}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                as="div"
                key={member.id}
                value={member}
                transition={{ stiffness: 250, duration: 0.2 }}
              >
                <TextChannelMember member={member} />
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </Flex>
    </Flex>
  );
};
