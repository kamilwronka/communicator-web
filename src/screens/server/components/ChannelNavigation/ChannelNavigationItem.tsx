import { Box, Flex, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { BiUserVoice } from 'react-icons/bi';
import { BsHash } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { ChannelType } from 'types/channel';

import { ServerChannel } from 'hooks/api/useServerChannels';

type Props = {
  channel: ServerChannel;
};

export const ChannelNavigationItem: React.FC<Props> = ({ channel }) => {
  const { channelId } = useParams();
  const navigate = useNavigate();

  const active = channel.id === channelId;

  const renderChannelIcon = () => {
    switch (channel.type) {
      case ChannelType.TEXT:
        return <BsHash fontSize="1.6rem" />;
      case ChannelType.VOICE:
        return <BiUserVoice fontSize="1.6rem" />;
      default:
        return null;
    }
  };

  const handleNavigate = () => {
    if (channel.type === 'TEXT') {
      navigate(`/channels/${channel.serverId}/${channel.id}`);
    }
  };

  const textProps = {
    color: active ? 'white' : 'gray.500',
    _groupHover: {
      bg: 'transparent',
      color: active ? 'white' : 'gray.400',
    },
    fontWeight: 'semibold',
  };

  return (
    <Flex
      onClick={handleNavigate}
      justifyContent="space-between"
      alignItems="space-between"
      flexDirection="row"
      px="3"
      py="1"
      mt="2"
      borderRadius="md"
      bg={active ? 'gray.600' : 'gray.800'}
      _hover={{ bg: active ? 'gray.600' : 'gray.700' }}
      transition="0.1s"
      fontSize="md"
      draggable="false"
      cursor="pointer"
      role="group"
    >
      <Flex justifyContent="center" alignItems="center" mr="2" w="4">
        <Text {...textProps}>{renderChannelIcon()}</Text>
      </Flex>
      <Flex alignItems="center" flex="1" w="12">
        <Text noOfLines={1} {...textProps}>
          {channel.name}
        </Text>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <Tooltip label="Edit Channel" placement="top" hasArrow bg="gray.700">
          <IconButton
            bg="transparent"
            color={active ? 'white' : 'transparent'}
            _groupHover={{
              bg: 'transparent',
              color: active ? 'white' : 'gray.400',
            }}
            aria-label="Edit Channel"
            size="xs"
            icon={<IoMdSettings size="18px" />}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
