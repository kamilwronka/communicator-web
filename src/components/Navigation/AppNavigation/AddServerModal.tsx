import { useState } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { AvatarField, TextField } from 'components/Form';

import { useAuthToken } from 'hooks/api/useAuthToken';
import { Server, useServers } from 'hooks/api/useServers';
import { useUser } from 'hooks/api/useUserData';

import { apiClient } from 'utils/apiClient';

type FormValues = {
  name: string;
  image: string;
  image_file: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddServerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { data: user } = useUser();
  const token = useAuthToken();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useServers();
  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await apiClient<Server>('/servers', {
        method: 'POST',
        token,
        data: values,
      });
      mutate(
        data => {
          // @ts-ignore
          return [...data, response];
        },
        { revalidate: false },
      );
      setIsLoading(false);
      onClose();
      navigate(`/channels/${response.id}`);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />

      <ModalContent bg="gray.700">
        <ModalHeader color="white">Create a server</ModalHeader>
        <ModalCloseButton color="white" />
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            name: `${user?.username}'s server`,
            image: '',
            image_file: '',
          }}
        >
          <Form>
            <ModalBody color="white">
              <VStack>
                <AvatarField name="image" tooltipText="Upload server image" />
              </VStack>
              <TextField
                helperText="Give your server a name and an icon. You can always change it later."
                label="Server name"
                name="name"
                border="0"
                bg="gray.800"
              />
            </ModalBody>
            <ModalFooter>
              <Stack direction="row">
                <Button onClick={onClose} variant="unstyled" mr="4">
                  Cancel
                </Button>
                <Button colorScheme="teal" type="submit" isLoading={isLoading}>
                  Create
                </Button>
              </Stack>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};
