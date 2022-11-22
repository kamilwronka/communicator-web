import { IconButton, useDisclosure } from '@chakra-ui/react';
import { BsVolumeMuteFill, BsVolumeUpFill } from 'react-icons/bs';

export const ToggleSoundButton: React.FC = () => {
  const { onToggle, isOpen: isMuted } = useDisclosure();

  const renderIcon = () => {
    return isMuted ? (
      <BsVolumeMuteFill onClick={onToggle} />
    ) : (
      <BsVolumeUpFill onClick={onToggle} />
    );
  };

  return (
    <IconButton
      variant="unstyled"
      display="flex"
      minWidth="8"
      aria-label="toggle sound"
      onClick={onToggle}
      icon={renderIcon()}
      size="lg"
    />
  );
};
