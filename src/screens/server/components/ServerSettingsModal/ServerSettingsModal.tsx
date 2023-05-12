import { useDisclosure } from '@chakra-ui/react';

import {
  SettingsModal,
  SettingsModalMenuItem,
} from '../../../../components/Modal/SettingsModal';

import { useEventSubscriber } from '../../../../hooks/useEventSubscriber';

import { ServerEvents } from '../../emitterEvents';
import { Overview } from './views/Overview';
import { Roles } from './views/Roles';

enum Tab {
  OVERVIEW = 'OVERVIEW',
  ROLES = 'ROLES',
}

export const menuItems: SettingsModalMenuItem[] = [
  {
    header: 'GENERAL',
    id: 1,
    tab: Tab.OVERVIEW,
    title: 'Overview',
    component: <Overview />,
  },
  {
    id: 2,
    tab: Tab.ROLES,
    title: 'Roles',
    component: <Roles />,
  },
  {
    header: 'Test',
    id: 3,
    tab: 'xdxd',
    title: 'Roles',
    component: <Roles />,
  },
  {
    id: 4,
    tab: 'xdxd2',
    title: 'Logout',
    component: <Roles />,
    onClick: () => console.log('penis'),
  },
];

export const ServerSettingsModal: React.FC = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  useEventSubscriber<void>(ServerEvents.TOGGLE_SERVER_SETTINGS_MODAL, () => {
    onToggle();
  });

  return (
    <SettingsModal isOpen={isOpen} onClose={onClose} menuItems={menuItems} />
  );
};
