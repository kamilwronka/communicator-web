import { Divider, Flex } from '@chakra-ui/react';

import { UserQuickMenu } from 'components';

import { ChannelNavigation } from './ChannelNavigation/ChannelNavigation';
import ServerSettingsMenu from './ServerSettingsMenu/ServerSettingsMenu';

export const Sidebar: React.FC = () => {
  return (
    <Flex direction="column" width="72">
      <ServerSettingsMenu />
      <Divider />
      <ChannelNavigation />
      <Divider />
      <UserQuickMenu />
    </Flex>
  );
};
