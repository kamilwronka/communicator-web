import { Divider, Flex } from '@chakra-ui/react';

import { UserQuickMenu } from 'components';

import { DirectMessages } from './DirectMessages/DirectMessages';

export const Sidebar: React.FC = () => {
  return (
    <Flex direction="column" width="72">
      <DirectMessages />
      <Divider />
      <UserQuickMenu />
    </Flex>
  );
};
