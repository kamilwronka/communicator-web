import { Text } from '@chakra-ui/react';

import { User } from '../../hooks/api/useUserData';

type Props = {
  optimistic: boolean;
  mention: User | undefined;
};

export const ChatMention: React.FC<Props> = ({ mention, optimistic }) => {
  return (
    <Text
      fontSize="md"
      color={optimistic ? 'gray.500' : 'white'}
      bg="blue.600"
      display="inline-block"
      cursor="pointer"
      as={'mark'}
      rounded="md"
      px="1"
      mr="1"
    >
      {`@${mention?.username}`}
    </Text>
  );
};
