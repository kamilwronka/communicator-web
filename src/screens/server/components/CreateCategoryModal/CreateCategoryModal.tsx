import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { useEventSubscriber } from 'hooks/useEventSubscriber';

import { useTranslation } from 'react-i18next';

import { ServerEvents } from 'screens/server/emitterEvents';

import { CreateCategoryForm } from './CreateCategoryForm';

export const CreateCategoryModal: React.FC = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { t } = useTranslation('server');

  useEventSubscriber<void>(ServerEvents.TOGGLE_CREATE_CATEGORY_MODAL, () => {
    onToggle();
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="gray.700">
        <ModalHeader color="white">
          {t('modals.createCategory.header', '')}
        </ModalHeader>
        <ModalCloseButton color="white" />
        <CreateCategoryForm onClose={onClose} />
      </ModalContent>
    </Modal>
  );
};
