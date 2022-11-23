import { Avatar, Box, Circle, Icon, Text } from '@chakra-ui/react';
import { BsHash } from 'react-icons/bs';
import { ChannelType } from 'types/channel';

type Props = {
  type: ChannelType.TEXT | ChannelType.PRIVATE;
  name?: string;
  imgSrc?: string;
};

export const ChatEndMessage: React.FC<Props> = ({ name, type, imgSrc }) => {
  return (
    <Box
      width="100%"
      maxWidth="100%"
      display="flex"
      flexDir="column"
      px="6"
      mb="10"
    >
      {type === ChannelType.PRIVATE && (
        <>
          <Avatar size="xl" name={name} src={imgSrc} />
          <Text
            fontSize="3xl"
            fontWeight="semibold"
            pt="4"
            textOverflow="hidden"
            w="full"
            wordBreak="break-word"
          >
            {name}
          </Text>
          <Text pt="2" display="flex" textOverflow="hidden">
            This is the beginning of your direct message history with @{name}
          </Text>
        </>
      )}
      {type === ChannelType.TEXT && (
        <>
          <Circle size="16" bg="gray.600">
            <Icon as={BsHash} width="12" height="12" />
          </Circle>
          <Text
            fontSize="3xl"
            fontWeight="semibold"
            pt="4"
            textOverflow="hidden"
            w="full"
            wordBreak="break-word"
          >
            Welcome to #{name}!
          </Text>
          <Text pt="2" display="flex" textOverflow="hidden">
            This is the start of the #{name} channel.
          </Text>
        </>
      )}
    </Box>
  );
};
