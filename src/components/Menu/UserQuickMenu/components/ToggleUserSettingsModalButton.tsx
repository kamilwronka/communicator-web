import { IconButton, useDisclosure } from '@chakra-ui/react';
import { AiTwotoneSetting } from 'react-icons/ai';

import { UserSettingsModal } from './UserSettingsModal';

export const ToggleUserSettingsModalButton: React.FC = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();

  return (
    <>
      <IconButton
        variant="unstyled"
        display="flex"
        aria-label="toggle user settings modal"
        onClick={onOpen}
        icon={<AiTwotoneSetting />}
        minWidth="8"
        size="lg"
      />
      <UserSettingsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
