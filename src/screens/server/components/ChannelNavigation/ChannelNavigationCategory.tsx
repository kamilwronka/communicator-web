import { useState } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { emitter } from 'eventEmitter';
import { BiPlus } from 'react-icons/bi';
import { useLocalStorage } from 'react-use';

import { ServerChannel } from 'hooks/servers/useServerChannels';

import { ServerEvents } from 'screens/server/emitterEvents';

type Props = {
  children?: React.ReactNode;
  channel: ServerChannel;
};

export const ChannelNavigationCategory: React.FC<Props> = ({
  children,
  channel,
}) => {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    `${channel._id}/collapsed`,
    false,
  );
  const [isOpen, setIsOpen] = useState(localStorageValue);

  const handleCategoryCreate = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    emitter.emit(ServerEvents.TOGGLE_CREATE_CHANNEL_MODAL, channel);
  };

  const handleChange = () => {
    setIsOpen(state => {
      setLocalStorageValue(!state);

      return !state;
    });
  };

  return (
    <Accordion
      border={0}
      width="full"
      index={isOpen ? 1 : 0}
      allowToggle
      onChange={handleChange}
    >
      <AccordionItem border={0} m="0">
        <AccordionButton
          px="0"
          py="0"
          color="gray.500"
          _hover={{ color: 'white' }}
        >
          <Flex alignItems="center" justifyContent="space-between" width="full">
            <AccordionIcon />
            <Text color="inherit" fontWeight="semibold" fontSize="sm" ml="2">
              {channel.name.toUpperCase()}
            </Text>

            <Flex flex="1" justifyContent="flex-end" pr="1">
              <Tooltip
                label="Create Channel"
                hasArrow
                placement="top"
                bg="gray.700"
                top="2"
              >
                <IconButton
                  as="div"
                  display="flex"
                  p="0"
                  variant="unstyled"
                  aria-label="add server"
                  icon={<BiPlus size="20px" />}
                  onClick={handleCategoryCreate}
                  margin="0"
                />
              </Tooltip>
            </Flex>
          </Flex>
        </AccordionButton>
        {children && (
          <AccordionPanel px="0" pb="1" pt="0" mt="-1">
            {children}
          </AccordionPanel>
        )}
      </AccordionItem>
    </Accordion>
  );
};
