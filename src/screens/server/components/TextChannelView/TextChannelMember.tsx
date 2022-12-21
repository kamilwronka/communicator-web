import { Flex, Text } from '@chakra-ui/react';

import { AvatarWithStatus } from 'components/Avatar';

import { TServerMember } from 'hooks/api/useServers';

export const TextChannelMember: React.FC<{ member: TServerMember }> = ({
  member,
}) => {
  return (
    <Flex
      flexDir="row"
      alignItems="center"
      px="4"
      py="2"
      my="1"
      bg="gray.800"
      _hover={{ bg: 'gray.700' }}
      transition="0.1s"
      rounded="lg"
      cursor="pointer"
    >
      <AvatarWithStatus
        status="online"
        name={member.username}
        src={member.avatar}
      />
      <Text ml="4">{member.username}</Text>
    </Flex>
  );
};
