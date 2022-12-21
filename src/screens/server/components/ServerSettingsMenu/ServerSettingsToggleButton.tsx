import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Text,
  useMenuButton,
} from '@chakra-ui/react';
import { HiSelector } from 'react-icons/hi';

import { useServers } from 'hooks/api/useServers';

const ServerSettingsToggleButton: React.FC<FlexProps> = (props: FlexProps) => {
  const buttonProps = useMenuButton(props);
  const { selectedServer } = useServers();

  return (
    <Flex
      as="button"
      {...buttonProps}
      w="full"
      alignItems="center"
      rounded="lg"
      bg="gray.700"
      px="3"
      py="1"
      fontSize="sm"
      userSelect="none"
      cursor="pointer"
      outline="0"
      transition="all 0.2s"
      _active={{ bg: 'gray.600' }}
      _focus={{ shadow: 'outline' }}
    >
      <HStack flex="1" spacing="3" w="8" h="8">
        <Text fontWeight="semibold" fontSize="md">
          {selectedServer?.name}
        </Text>
      </HStack>
      <Box fontSize="lg" color="gray.400">
        <HiSelector />
      </Box>
    </Flex>
  );
};

export default ServerSettingsToggleButton;
