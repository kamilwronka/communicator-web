import { useEffect, useMemo } from 'react';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

import {
  ServerChannelType,
  useServerChannels,
} from 'hooks/api/useServerChannels';

export const NoTextChannelsView: React.FC = () => {
  const { data: channels, isLoading } = useServerChannels();
  const navigate = useNavigate();
  const { serverId } = useParams();

  const [lastVisitedChannel] = useLocalStorage(
    `${serverId}/lastVisitedChannel`,
  );

  const getRedirectRoute = useMemo(
    () => () => {
      const basePath = `/channels/${serverId}`;
      if (lastVisitedChannel) {
        return `${basePath}/${lastVisitedChannel}`;
      }
      if (channels) {
        const defaultTextChannel = channels.find(
          channel => channel.type === ServerChannelType.TEXT,
        );
        return defaultTextChannel
          ? `${basePath}/${defaultTextChannel.id}`
          : null;
      }

      return null;
    },
    [serverId, channels, lastVisitedChannel],
  );

  useEffect(() => {
    const redirectRoute = getRedirectRoute();
    if (redirectRoute && !isLoading) {
      navigate(redirectRoute);
    }
  }, [serverId, getRedirectRoute, navigate, isLoading]);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      width="full"
      height="full"
    >
      <Box w="96" textAlign="center">
        <Heading size="lg">NO TEXT CHANNELS</Heading>
        <Text mt="4">
          It's empty here. You don't have access to any text channels or there
          are none in this server.
        </Text>
      </Box>
    </Flex>
  );
};
