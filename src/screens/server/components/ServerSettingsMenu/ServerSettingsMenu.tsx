import { Flex, Menu, MenuList } from '@chakra-ui/react';
import { emitter } from 'eventEmitter';
import { AiOutlineFolderAdd, AiOutlineUserAdd } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';

import { ServerEvents } from 'screens/server/emitterEvents';

import ServerSettingsMenuItem from './ServerSettingsMenuItem';
import ServerSettingsToggleButton from './ServerSettingsToggleButton';

const ServerSettingsMenu = () => {
  return (
    <Menu placement="bottom">
      <Flex w="full" px="4" h="16" alignItems="center">
        <ServerSettingsToggleButton />

        <MenuList
          shadow="lg"
          py="4"
          color="white"
          px="3"
          bg="gray.700"
          width="64"
          border="0"
          boxShadow="dark-lg"
        >
          <ServerSettingsMenuItem
            label="Invite people"
            onClick={() => emitter.emit(ServerEvents.TOGGLE_INVITE_MODAL)}
            icon={<AiOutlineUserAdd fontSize="1.2rem" />}
          />
          <ServerSettingsMenuItem
            label="Create channel"
            icon={<IoMdAddCircleOutline fontSize="1.2rem" />}
            onClick={() =>
              emitter.emit(ServerEvents.TOGGLE_CREATE_CHANNEL_MODAL)
            }
          />
          <ServerSettingsMenuItem
            label="Create category"
            icon={<AiOutlineFolderAdd fontSize="1.2rem" />}
            onClick={() =>
              emitter.emit(ServerEvents.TOGGLE_CREATE_CATEGORY_MODAL)
            }
          />
        </MenuList>
      </Flex>
    </Menu>
  );
};

export default ServerSettingsMenu;
