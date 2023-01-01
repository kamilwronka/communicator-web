import { useEffect, useRef, useState } from 'react';

import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

import { Avatar } from 'components/Avatar';

import { useAuthToken } from 'hooks/api/useAuthToken';
import { TServerInvite, useServerInvites } from 'hooks/api/useServerInvites';
import { useServers } from 'hooks/api/useServers';
import {
  ERelationshipType,
  useUserRelationships,
} from 'hooks/api/useUserRelationships';
import { useEventSubscriber } from 'hooks/useEventSubscriber';

import { ServerEvents } from 'screens/server/emitterEvents';

import { apiClient } from 'utils/apiClient';
import { copyTextToClipboard } from 'utils/copyTextToClipboard';

export const InviteModal: React.FC = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { data: invites, mutate: mutateInvites } = useServerInvites();
  const { serverId, selectedServer } = useServers();
  const { data: relationships } = useUserRelationships();
  const token = useAuthToken();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const inviteLinkRef = useRef<HTMLParagraphElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEventSubscriber<void>(ServerEvents.TOGGLE_INVITE_MODAL, () => {
    onToggle();
  });

  const invite = invites?.find(invite => invite);
  const inviteLink = invite?.id
    ? `${window.location.origin}/join/${invite?.id}`
    : '';

  useEffect(() => {
    if (!invite && serverId && token && isOpen) {
      const data = {
        maxAge: 0,
        maxUses: 0,
        validate: null,
      };

      setIsLoading(true);

      apiClient<TServerInvite>(`/servers/${serverId}/invites`, {
        method: 'POST',
        token,
        data,
      })
        .then(response => {
          mutateInvites(prevInvites => {
            return [...(prevInvites ? prevInvites : []), ...[response]];
          });

          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [invite, mutateInvites, serverId, token, isOpen]);

  const copyInviteLink = () => {
    copyTextToClipboard(inviteLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const selectInviteLink = () => {
    const range = document.createRange();
    const selection = getSelection();
    // @ts-ignore
    range.selectNodeContents(inviteLinkRef?.current);
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="gray.700">
        <ModalHeader color="white">
          Invite friends to {selectedServer?.name}
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody color="white">
          <Flex h="80px" alignItems="center">
            <InputGroup>
              <Input
                border="0"
                bg="gray.800"
                outline="none"
                placeholder="Search for friends"
              />
              <InputRightElement
                children={<Icon as={BsSearch} color="gray.500" />}
              />
            </InputGroup>
          </Flex>
          <Divider />
          <Box
            my="2"
            maxH="240px"
            overflowY="auto"
            sx={{
              '&::-webkit-scrollbar-track': {
                bg: 'whiteAlpha.100',
                borderRadius: '20px',
              },
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                bg: 'gray.900',
                borderRadius: '20px',
              },
            }}
          >
            {relationships?.map(relationship => {
              const { user, type } = relationship;

              if (type !== ERelationshipType.ACCEPTED) {
                return null;
              }

              return (
                <Flex
                  key={relationship.id}
                  justifyContent="center"
                  flexDir="row"
                  my="4"
                  pr="2"
                >
                  <Flex flex="1" alignItems="center">
                    <Avatar src={user.avatar} name={user.username} size="sm" />
                    <Text ml="4">{user.username}</Text>
                  </Flex>
                  <Button variant="green" size="sm">
                    Invite
                  </Button>
                </Flex>
              );
            })}
          </Box>
          <Divider />
          <Text mt="4" fontWeight="semibold">
            Servers invite link
          </Text>

          <Flex alignItems="center" bg="gray.800" mb="6" rounded="lg" mt="2">
            <Text
              flex="1"
              fontSize="md"
              color="gray.300"
              py="2"
              pl="2"
              ref={inviteLinkRef}
              onClick={selectInviteLink}
              overflowX="hidden"
            >
              {inviteLink}
            </Text>
            <Button
              size="sm"
              variant="green"
              mr="1"
              onClick={copyInviteLink}
              w="80px"
              minW="80px"
            >
              {isCopied ? 'Copied' : 'Copy'}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
