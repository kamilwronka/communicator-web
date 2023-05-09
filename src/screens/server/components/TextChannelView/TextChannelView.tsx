import { useCallback, useEffect } from 'react';

import { Divider, Flex } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';
import { nanoid } from 'nanoid';
import { BsHash } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import { ChatHeading, ChatInput, ChatMessagesContainer } from 'components';
import { ChatEndMessage } from 'components/Chat/ChatEndMessage';

import { GatewayEvents } from 'enums/gatewayEvents';

import { useServerMembers } from '../../../../hooks/api/useServerMembers';
import { useEventSubscriber } from '../../../../hooks/useEventSubscriber';
import { useAuthToken } from 'hooks/api/useAuthToken';
import {
  ChatMessage,
  EActionType,
  useInfiniteChatMessages,
} from 'hooks/api/useChatMessages';
import {
  ServerChannelType,
  useServerChannels,
} from 'hooks/api/useServerChannels';
import { useUser } from 'hooks/api/useUserData';

import { mapMembersToSuggestions } from '../../../../utils/mapToSuggestions';
import { apiClient } from 'utils/apiClient';
import { imageUploadApiClient } from 'utils/imageUploadApiClient';

import { TextChannelMembers } from './TextChannelMembers';

type FileUploadResponse = {
  key: string;
  url: string;
};

export const TextChannelView: React.FC = () => {
  const { selectedChannel } = useServerChannels();
  const { channelId, serverId } = useParams();
  const token = useAuthToken();
  const { data: user } = useUser();
  const { finished, messages, loading, setPage, dispatch } =
    useInfiniteChatMessages(channelId);
  const { data: members } = useServerMembers();
  // const { socket, connected } = useGateway();

  const handleNewMessage = (message: ChatMessage) => {
    console.log(channelId, message.channelId);
    if (channelId === message.channelId) {
      dispatch({ type: EActionType.ADD_OR_UPDATE, payload: message });
    }
  };

  useEventSubscriber<ChatMessage>(
    GatewayEvents.SERVER_MESSAGE_SEND,
    message => {
      handleNewMessage(message);
    },
  );

  const handleChatMessage = async (
    value: string,
    mentions: any[],
    files: File[],
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
      channelId: channelId,
      mentions,
      attachments: files,
    };

    dispatch({ type: EActionType.ADD_OR_UPDATE, payload: newMessage });

    let attachmentsUploadData: FileUploadResponse[] = [];

    if (!isEmpty(files)) {
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

  const mentions = mapMembersToSuggestions(members);

  return (
    <Flex direction="row" height="full">
      <Flex flex="1" width="full" flexDirection="column" height="full">
        <ChatHeading icon={<BsHash size="24px" />}>
          {selectedChannel?.name}
        </ChatHeading>
        <Divider />
        <ChatMessagesContainer
          onScroll={handleScroll}
          loading={loading}
          finished={finished}
          messages={messages}
          endMessage={
            <ChatEndMessage
              type={ServerChannelType.TEXT}
              name={selectedChannel?.name}
            />
          }
        />

        <ChatInput
          onEnter={handleChatMessage}
          placeholder={`Message #${selectedChannel?.name}`}
          mentions={mentions}
        />
      </Flex>
      <TextChannelMembers />
    </Flex>
  );
};
