import { useState } from 'react';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { BsSearch } from 'react-icons/bs';

import { useAuthToken } from 'hooks/common/useAuthToken';
import { TUserRelationship } from 'hooks/common/useUserRelationships';

import { apiClient } from 'utils/apiClient';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddRelationshipModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const token = useAuthToken();
  const toast = useToast();

  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);

  const handleSendFriendRequest = async () => {
    setLoading(true);

    const requestData = {
      username: value,
    };

    try {
      const response = await apiClient<TUserRelationship>(
        '/users/me/relationships',
        {
          method: 'POST',
          data: requestData,
          token,
        },
      );
      setLoading(false);
      setError(undefined);
      setValue('');
      toast({
        title: 'Success',
        description: `Successfully sent friend request to ${response.user}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      }

      throw error;
    }
  };

  const isError = !isNil(error) && !isEmpty(error);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="gray.700">
        <ModalHeader color="white">Add Friend</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody color="white">
          <FormControl isInvalid={isError}>
            <FormLabel htmlFor="email">Username</FormLabel>
            <InputGroup>
              <Input
                color="white"
                bg="gray.800"
                border="0"
                placeholder="Type friend username here"
                h="40px"
                value={value}
                onChange={e => setValue(e.target.value)}
                isInvalid={!isNil(error) && !isEmpty(error)}
              />
              <InputRightElement
                children={<Icon as={BsSearch} color="gray.500" />}
              />
            </InputGroup>
            {!isError ? (
              <FormHelperText>
                You can add a friend with their username. It's cAsE sEnSitIve!
              </FormHelperText>
            ) : (
              <FormErrorMessage>{error.message}</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Stack direction="row">
            <Button variant="unstyled" onClick={onClose} mr="4">
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              onClick={handleSendFriendRequest}
              isLoading={loading}
              disabled={value.length <= 2}
            >
              Send friend request
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
