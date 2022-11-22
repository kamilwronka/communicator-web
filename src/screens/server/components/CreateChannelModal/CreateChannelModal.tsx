import { useState } from 'react';

import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { ServerChannel } from 'hooks/servers/useServerChannels';
import { useEventSubscriber } from 'hooks/useEventSubscriber';

import { useTranslation } from 'react-i18next';

import { ServerEvents } from 'screens/server/emitterEvents';

import { CreateChannelForm } from './CreateChannelForm';

export const CreateChannelModal: React.FC = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [parent, setParent] = useState<ServerChannel>();
  const { t } = useTranslation('server');

  useEventSubscriber<ServerChannel>(
    ServerEvents.TOGGLE_CREATE_CHANNEL_MODAL,
    payload => {
      setParent(payload);
      onToggle();
    },
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="gray.700">
        <ModalHeader color="white">
          {t('modals.createServer.header')}
          {parent && (
            <Text fontSize="sm" fontWeight="normal">
              in {parent.name}
            </Text>
          )}
        </ModalHeader>
        <ModalCloseButton color="white" />
        <CreateChannelForm onClose={onClose} parent={parent} />
      </ModalContent>
    </Modal>
  );
};
