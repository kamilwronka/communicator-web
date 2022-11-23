import { MouseEvent } from 'react';

import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

type Props = {
  fileSrc: string;
};

export const ChatMessageImagePreview: React.FC<
  Omit<ModalProps, 'children'> & Props
> = ({ isOpen, onClose, fileSrc }) => {
  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    // @ts-ignore
    const id = e.target.id;

    if (id === 'overlay') {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent
        bg="transparent"
        position="relative"
        onClick={handleClose}
        id="overlay"
      >
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody onClick={handleClose} id="overlay">
          <Image
            src={fileSrc}
            objectFit="scale-down"
            position="absolute"
            maxHeight="85%"
            maxWidth="85%"
            transform="translate(-50%, -50%)"
            top="50%"
            left="50%"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
