import { useMemo, useState } from 'react';

import { Box, Divider, Flex, Heading } from '@chakra-ui/react';
import { Reorder } from 'framer-motion';
import noop from 'lodash/noop';

import { SearchInput } from 'components';

import { useServers } from 'hooks/servers/useServers';

import { TextChannelMember } from './TextChannelMember';

export const TextChannelMembers: React.FC = () => {
  const { selectedServer } = useServers();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChange = (query: string) => {
    setSearchValue(query);
  };

  // const members = useMemo(() => {
  //   return selectedServer?.members.filter(member =>
  //     member.username.toLowerCase().includes(searchValue.toLowerCase()),
  //   );
  // }, [selectedServer?.members, searchValue]);

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
        {/* <Reorder.Group
          axis="y"
          // values={members ? members : []}
          layoutScroll
          style={{ listStyleType: 'none' }}
          onReorder={noop}
        > */}
        {/* {members?.map(member => {
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
          })} */}
        {/* </Reorder.Group> */}
      </Flex>
    </Flex>
  );
};
