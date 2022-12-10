import { useCallback, useEffect } from 'react';

import { Divider, Flex } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';
import { nanoid } from 'nanoid';
import { ChannelType } from 'types/channel';

import { ChatHeading, ChatInput, ChatMessagesContainer } from 'components/Chat';
import { ChatEndMessage } from 'components/Chat/ChatEndMessage';

import { useAuthToken } from 'hooks/common/useAuthToken';
import { useUser } from 'hooks/common/useUserData';
import {
  EActionType,
  TChatMessage,
  useInfiniteChatMessages,
} from 'hooks/useChatMessages';
import { useGateway } from 'hooks/useGateway';
import { usePrivateChannels } from 'hooks/usePrivateChannels';

import { apiClient } from 'utils/apiClient';
import { imageUploadApiClient } from 'utils/imageUploadApiClient';
import { mapToSuggestions } from 'utils/mapToSuggestions';

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

  const { socket, connected } = useGateway();

  const setupEvents = useCallback(() => {
    socket.on(Events.MESSAGE, (messageData: TChatMessage) => {
      if (messageData.channel_id === channelId) {
        dispatch({ type: EActionType.ADD_OR_UPDATE, payload: messageData });
      }
    });
  }, [socket, dispatch, channelId]);

  const clearEvents = useCallback(() => {
    socket.off(Events.MESSAGE);
  }, [socket]);

  useEffect(() => {
    connected && setupEvents();

    return () => {
      if (socket && connected) {
        clearEvents();
      }
    };
  }, [connected, setupEvents, clearEvents]);

  useEffect(() => {
    connected && socket.emit('join', channelId);

    return () => {
      socket.emit('leave', channelId);
    };
  }, [channelId, connected, socket]);

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

    const newMessage: TChatMessage = {
      nonce,
      author: user,
      content: value,
      createdAt: new Date().toISOString(),
      channel_id: channelId,
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

    const response = await apiClient<TChatMessage>(
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
  const suggestions = mapToSuggestions(selectedChannel?.users);

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
            type={ChannelType.PRIVATE}
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
