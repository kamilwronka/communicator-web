import { useCallback, useEffect } from 'react';

import { Divider, Flex } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';
import { nanoid } from 'nanoid';
import { BsHash } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { ChannelType } from 'types/channel';

import { ChatHeading, ChatInput, ChatMessagesContainer } from 'components';
import { ChatEndMessage } from 'components/Chat/ChatEndMessage';

import { useAuthToken } from 'hooks/common/useAuthToken';
import { useUser } from 'hooks/common/useUserData';
import { useServerChannels } from 'hooks/servers/useServerChannels';
import {
  EActionType,
  TChatMessage,
  useInfiniteChatMessages,
} from 'hooks/useChatMessages';
import { useGateway } from 'hooks/useGateway';

import { apiClient } from 'utils/apiClient';
import { imageUploadApiClient } from 'utils/imageUploadApiClient';

import { TextChannelMembers } from './TextChannelMembers';

enum Events {
  MESSAGE = 'message',
}

type FileUploadResponse = {
  key: string;
  url: string;
};

export const TextChannelView: React.FC = () => {
  const { selectedChannel } = useServerChannels();
  const { channelId } = useParams();
  const token = useAuthToken();
  const { data: user } = useUser();
  const { finished, messages, loading, setPage, dispatch } =
    useInfiniteChatMessages(channelId);
  const { socket, connected } = useGateway();

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

    const newMessage: TChatMessage = {
      nonce,
      author: user,
      content: value,
      created_at: new Date().toISOString(),
      channel_id: channelId,
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

  const setupEvents = useCallback(() => {
    socket.on(Events.MESSAGE, (messageData: TChatMessage) => {
      dispatch({ type: EActionType.ADD_OR_UPDATE, payload: messageData });
    });
  }, [socket, dispatch]);

  const clearEvents = useCallback(() => {
    socket.off(Events.MESSAGE);
    // socket.off(Events.RELATIONSHIP_REQUEST);
  }, [socket]);

  useEffect(() => {
    connected && setupEvents();

    return () => {
      connected && clearEvents();
    };
  }, [connected, setupEvents, clearEvents, socket, channelId]);

  useEffect(() => {
    connected && socket.emit('join', channelId);

    return () => {
      socket.emit('leave', channelId);
    };
  }, [channelId, connected, socket]);

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
              type={ChannelType.TEXT}
              name={selectedChannel?.name}
            />
          }
        />

        <ChatInput
          onEnter={handleChatMessage}
          placeholder={`Message #${selectedChannel?.name}`}
          // mentions={mentions}
        />
      </Flex>
      <TextChannelMembers />
    </Flex>
  );
};
