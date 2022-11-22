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
      <ModalContent bg="transparent">
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="full"
          height="full"
          padding="12"
          onClick={handleClose}
          id="overlay"
        >
          <Image src={fileSrc} height="full" objectFit="scale-down" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
