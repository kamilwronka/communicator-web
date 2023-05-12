import { Icon, IconButton, useDisclosure } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/bi';

import { AddServerModal } from './AddServerModal';

export const AddServerButton: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <IconButton
        mt="2"
        variant="green"
        aria-label="Create new server"
        size="lg"
        icon={<Icon w={6} h={6} as={BiPlus} />}
        rounded="full"
        onClick={onOpen}
      />
      <AddServerModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
