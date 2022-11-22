import { IconButton, useDisclosure } from '@chakra-ui/react';
import { BsMicFill, BsMicMuteFill } from 'react-icons/bs';

export const ToggleMicrophoneButton: React.FC = () => {
  const { onToggle, isOpen: isMuted } = useDisclosure();

  const renderIcon = () => {
    return isMuted ? <BsMicMuteFill onClick={onToggle} /> : <BsMicFill />;
  };

  return (
    <IconButton
      variant="unstyled"
      display="flex"
      aria-label="toggle microphone"
      onClick={onToggle}
      icon={renderIcon()}
      minWidth="8"
      size="lg"
    />
  );
};
