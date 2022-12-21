import { Flex, HStack, Text } from '@chakra-ui/react';

import { ToggleMicrophoneButton } from './components/ToggleMicrophoneButton';
import { ToggleSoundButton } from './components/ToggleSoundButton';
import { ToggleUserSettingsModalButton } from './components/ToggleUserSettingsModalButton';
import { AvatarWithStatus } from 'components/Avatar';

import { useUser } from 'hooks/api/useUserData';

export const UserQuickMenu: React.FC = props => {
  const { data: user } = useUser();

  return (
    <Flex
      w="full"
      h="16"
      alignItems="center"
      px="3"
      outline="none"
      margin="0 !important"
    >
      <HStack flex="1" spacing="3.5">
        <AvatarWithStatus
          src={user?.avatar}
          name={user?.username}
          status="online"
        />
        <Text fontWeight="semibold" fontSize="md" as="p">
          {user?.username}
        </Text>
      </HStack>
      <HStack fontSize="lg" color="gray.400" spacing={2}>
        <ToggleMicrophoneButton />
        <ToggleSoundButton />
        <ToggleUserSettingsModalButton />
      </HStack>
    </Flex>
  );
};
