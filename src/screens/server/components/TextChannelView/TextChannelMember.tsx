import { Flex, Text } from '@chakra-ui/react';

import { AvatarWithStatus } from 'components/Avatar';

import { ServerMember } from 'hooks/api/useServerMembers';

type Props = {
  member: ServerMember;
};

export const TextChannelMember: React.FC<Props> = ({ member }) => {
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
        name={member.user.username}
        src={member.user.avatar}
      />
      <Text ml="4">{member.user.username}</Text>
    </Flex>
  );
};
