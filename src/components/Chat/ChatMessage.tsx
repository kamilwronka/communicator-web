import { Avatar, Box, Divider, Text } from '@chakra-ui/react';

import { CHAT_MESSAGES_SPLIT_REGEX } from 'config/chat';

import {
  Attachment,
  ChatMessage as ChatMessageType,
} from '../../hooks/api/useChatMessages';
import { User } from '../../hooks/api/useUserData';

import { formatDateIntl, formatDateRelative } from 'utils/date';

import { ChatMention } from './ChatMention';
import { ChatMessageAttachment } from './ChatMessageAttachment';

export interface Props {
  shouldRenderUserDetails?: boolean;
  message: ChatMessageType;
  optimistic: boolean;
  renderDivider: boolean;
}

export const ChatMessage: React.FC<Props> = ({
  shouldRenderUserDetails,
  message,
  optimistic,
  renderDivider,
}) => {
  const { author, createdAt, mentions, content, attachments } = message;

  const renderMessageContent = () => {
    const parts = content.split(CHAT_MESSAGES_SPLIT_REGEX);

    return parts.filter(String).map((part, i) => {
      if (CHAT_MESSAGES_SPLIT_REGEX.test(part)) {
        const id = part.replace('<@', '').replace('>', '');

        let mention: User = {
          id,
          username: 'unknown',
          avatar: '',
        };

        const desiredMention = mentions?.find(mention => mention.id === id);

        if (desiredMention) {
          mention = desiredMention;
        }

        return (
          <ChatMention key={i} optimistic={optimistic} mention={mention} />
        );
      }

      return (
        <Text
          key={i}
          fontSize="md"
          color={optimistic ? 'gray.500' : 'white'}
          display="inline-block"
          pr="1"
        >
          {part}
        </Text>
      );
    });
  };

  return (
    <>
      {renderDivider && (
        <Box px="6" position="relative">
          <Divider mt="6" pb="0" />
          <Box
            position="absolute"
            width="100%"
            top="-3"
            display="flex"
            justifyContent="center"
          >
            <Box bg="gray.700" px="2">
              <Text fontWeight="semibold" fontSize="sm">
                {formatDateIntl(createdAt)}
              </Text>
            </Box>
          </Box>
        </Box>
      )}
      <Box
        display="flex"
        flexDir="row"
        mt={shouldRenderUserDetails || renderDivider ? 6 : 0}
        _hover={{ bg: 'whiteAlpha.100' }}
        pl="6"
        pr="20"
        py="1"
        w="full"
      >
        <Box width="16" minWidth="16" display="flex" alignItems="flex-start">
          {(shouldRenderUserDetails || renderDivider) && (
            <Avatar name={author?.username} src={author?.avatar} size="md" />
          )}
        </Box>
        <Box display="flex" flexDir="column" w="full">
          {(shouldRenderUserDetails || renderDivider) && (
            <Box display="flex" flexDir="row" alignItems="baseline">
              <Text fontWeight="bold" fontSize="lg">
                {author?.username}
              </Text>
              <Text color="gray.500" fontSize="xs" ml="2">
                {formatDateRelative(createdAt)}
              </Text>
            </Box>
          )}
          <Box>
            <Box
              fontSize="md"
              color={optimistic ? 'gray.500' : 'white'}
              wordBreak="break-all"
            >
              {attachments?.map((file: Attachment, index) => {
                const key = file instanceof File ? index : file.id;
                return (
                  <ChatMessageAttachment
                    key={key}
                    file={file}
                    optimistic={optimistic}
                  />
                );
              })}
              {renderMessageContent()}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
