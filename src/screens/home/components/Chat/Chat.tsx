import { useCallback, useEffect } from 'react';

import { Divider, Flex } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';
import { nanoid } from 'nanoid';

import { ChatHeading, ChatInput, ChatMessagesContainer } from 'components/Chat';
import { ChatEndMessage } from 'components/Chat/ChatEndMessage';

import { GatewayEvents } from '../../../../enums/gatewayEvents';

import { useEventSubscriber } from '../../../../hooks/useEventSubscriber';
import { useAuthToken } from 'hooks/api/useAuthToken';
import {
  ChatMessage,
  EActionType,
  useInfiniteChatMessages,
} from 'hooks/api/useChatMessages';
import { useGateway } from 'hooks/api/useGateway';
import {
  PrivateChannelType,
  usePrivateChannels,
} from 'hooks/api/usePrivateChannels';
import { useUser } from 'hooks/api/useUserData';

import { apiClient } from 'utils/apiClient';
import { imageUploadApiClient } from 'utils/imageUploadApiClient';
import { mapUsersToSuggestions } from 'utils/mapToSuggestions';

enum Events {
  MESSAGE = 'message',
  RELATIONSHIP_REQUEST = 'relationship-request',
}

type FileUploadResponse = {
  key: string;
  url: string;
};

export const Chat: React.FC = () => {
  const { selectedChannel, channelId } = usePrivateChannels();
  const { data: user } = useUser();
  const token = useAuthToken();

  const { setPage, finished, loading, messages, dispatch } =
    useInfiniteChatMessages(channelId);

  const handleNewMessage = (message: ChatMessage) => {
    console.log(channelId, message.channelId);
    if (channelId === message.channelId) {
      dispatch({ type: EActionType.ADD_OR_UPDATE, payload: message });
    }
  };

  useEventSubscriber<ChatMessage>(
    GatewayEvents.DIRECT_MESSAGE_SEND,
    message => {
      handleNewMessage(message);
    },
  );

  const handleChatMessage = async (
    value: string,
    mentions: any[],
    files?: File[],
  ) => {
    if (value.length < 1 && isEmpty(files)) {
      return;
    }

    if (!user) {
      throw new Error('No user data');
    }

    const nonce = nanoid();

    const newMessage: ChatMessage = {
      nonce,
      author: user,
      content: value,
      createdAt: new Date().toISOString(),
      mentions,
      attachments: files,
    };

    dispatch({ type: EActionType.ADD_OR_UPDATE, payload: newMessage });

    let attachmentsUploadData: FileUploadResponse[] = [];

    if (files && !isEmpty(files)) {
      attachmentsUploadData = await apiClient<FileUploadResponse[]>(
        `/channels/${channelId}/attachments`,
        {
          token,
          method: 'POST',
          data: {
            files: files.map(file => ({
              filename: file.name,
              fileSize: file.size,
            })),
          },
        },
      );

      await Promise.all(
        attachmentsUploadData.map(({ url, key }, i) => {
          return imageUploadApiClient(url, { data: files[i] });
        }),
      );
    }

    const response = await apiClient<ChatMessage>(
      `/channels/${channelId}/messages`,
      {
        method: 'POST',
        data: {
          content: newMessage.content,
          nonce,
          attachments: !isEmpty(attachmentsUploadData)
            ? attachmentsUploadData
            : undefined,
        },
        token,
      },
    );

    dispatch({ type: EActionType.ADD_OR_UPDATE, payload: response });
  };

  const handleScroll = useCallback(() => {
    setPage(page => page + 1);
  }, [setPage]);

  const chatPartner = selectedChannel?.users.find(
    participant => participant.id !== user?.id,
  );
  const suggestions = mapUsersToSuggestions(selectedChannel?.users);

  return (
    <Flex flex="1" width="full" flexDirection="column" height="full">
      <ChatHeading icon={'@'}>{chatPartner?.username}</ChatHeading>
      <Divider />
      <ChatMessagesContainer
        onScroll={handleScroll}
        messages={messages}
        finished={finished}
        loading={loading}
        endMessage={
          <ChatEndMessage
            type={PrivateChannelType.PRIVATE}
            name={chatPartner?.username}
          />
        }
      />
      <ChatInput
        onEnter={handleChatMessage}
        placeholder="Message @user"
        mentions={suggestions}
      />
    </Flex>
  );
};
