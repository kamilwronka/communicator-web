import { useEffect } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import { GatewayEvents } from '../../../../enums/gatewayEvents';

import { useGateway } from '../../../../hooks/api/useGateway';
import {
  ServerChannel,
  ServerChannelType,
  useServerChannels,
} from 'hooks/api/useServerChannels';

import { ChannelNavigationCategory } from './ChannelNavigationCategory';
import { ChannelNavigationItem } from './ChannelNavigationItem';

const flatArrayToTree = (items: any, id = null, link = 'parentId') =>
  items
    .filter((item: any) => item[link] === id)
    .map((item: any) => ({
      ...item,
      children: flatArrayToTree(items, item.id),
    }));

export const ChannelNavigation: React.FC = () => {
  const { data: channels, mutate } = useServerChannels();
  const { socket, connected } = useGateway();

  const sortedTree = channels?.sort((a: any, b: any) => {
    if (a.type === ServerChannelType.PARENT) {
      return 1;
    }

    if (b.type === ServerChannelType.PARENT) {
      return -1;
    }

    return 0;
  });
  const tree = flatArrayToTree(sortedTree);

  const renderNavigationTree = (items: ServerChannel[]) => {
    return items.map((channel: ServerChannel) => {
      if (channel.children.length > 0) {
        return (
          <ChannelNavigationCategory key={channel.id} channel={channel}>
            {renderNavigationTree(channel.children)}
          </ChannelNavigationCategory>
        );
      }

      if (channel.type === ServerChannelType.PARENT) {
        return <ChannelNavigationCategory key={channel.id} channel={channel} />;
      }

      return <ChannelNavigationItem channel={channel} key={channel.id} />;
    });
  };

  useEffect(() => {
    if (connected) {
      socket.on(GatewayEvents.SERVER_CHANNEL_CREATE, payload => {
        console.log(payload);
        mutate(
          data => {
            // @ts-ignore
            let isUpdated = false;
            data?.forEach(channel => {
              if (channel.id === payload.id) {
                console.log(channel.id, payload.id);
                isUpdated = true;
              }
            });
            // @ts-ignore
            return [...data, ...(isUpdated ? [] : [payload])];
          },
          { revalidate: false },
        );
      });
    }
  }, [connected, socket, mutate]);

  return (
    <Box overflowY="hidden" flex="1" px="1" py="2">
      <Flex
        direction="column"
        height="full"
        overflowY="scroll"
        px="1.5"
        width="full"
        sx={{
          '&::-webkit-scrollbar': {
            width: '1.5',
          },
          '&::-webkit-scrollbar-thumb': {
            bg: 'gray.900',
            borderRadius: '20px',
          },
          scrollbarGutter: 'stable both-edges',
        }}
      >
        <Box width="full">{tree && renderNavigationTree(tree)}</Box>
      </Flex>
    </Box>
  );
};
