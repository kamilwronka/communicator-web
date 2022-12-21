import { Box, Flex } from '@chakra-ui/react';
import { ChannelType } from 'types/channel';

import { ServerChannel, useServerChannels } from 'hooks/api/useServerChannels';

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
  const { data: channels } = useServerChannels();

  const sortedTree = channels?.sort((a: any, b: any) => {
    if (a.type === ChannelType.PARENT) {
      return 1;
    }

    if (b.type === ChannelType.PARENT) {
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

      if (channel.type === ChannelType.PARENT) {
        return <ChannelNavigationCategory key={channel.id} channel={channel} />;
      }

      return <ChannelNavigationItem channel={channel} key={channel.id} />;
    });
  };

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
