import { useState } from 'react';

import {
  Button,
  ModalBody,
  ModalFooter,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { useParams } from 'react-router-dom';
import { object, string } from 'yup';

import { TextField } from 'components';

import { useAuthToken } from 'hooks/api/useAuthToken';
import {
  ServerChannel,
  ServerChannelType,
  useServerChannels,
} from 'hooks/api/useServerChannels';

import { useTranslation } from 'react-i18next';

import { apiClient } from 'utils/apiClient';

type Props = {
  onClose: () => void;
};

type FormValues = {
  name: string;
};

const MIN_CHARACTERS = 1;
const MAX_CHARACTERS = 30;

export const CreateCategoryForm: React.FC<Props> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { serverId } = useParams();
  const token = useAuthToken();
  const { mutate } = useServerChannels();
  const { t } = useTranslation('server', { keyPrefix: 'forms.createCategory' });
  const { t: c } = useTranslation('common');
  const toast = useToast();

  const validationSchema = object({
    name: string()
      .required(t('name.error.required', undefined))
      .min(MIN_CHARACTERS, t('name.error.tooShort', undefined))
      .max(MAX_CHARACTERS, t('name.error.tooLong', undefined)),
  });

  const initialValues = { name: '' };

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await apiClient<ServerChannel>(`/channels`, {
        method: 'POST',
        data: { name: values.name, type: ServerChannelType.PARENT, serverId },
        token,
      });
      mutate(
        data => {
          if (data) {
            return [...data, response];
          }
          return [response];
        },
        { revalidate: false },
      );
      setIsLoading(false);
      onClose();
    } catch (error) {
      setIsLoading(false);
      toast({
        position: 'top-right',
        title: c('errors.unexpectedError'),
        status: 'error',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ errors }) => (
        <Form>
          <ModalBody color="white">
            <TextField
              name="name"
              label={t('name.label', '')}
              helperText={t('name.helperText', '')}
              placeholder={t<string>('name.placeholder')}
              bg="gray.800"
              border="0"
              disableErrors
              autoFocus
            />
          </ModalBody>
          <ModalFooter>
            <Stack direction="row">
              <Button variant="unstyled" onClick={onClose} px="4 !important">
                {c('cancel')}
              </Button>
              <Button
                type="submit"
                colorScheme="teal"
                isLoading={isLoading}
                disabled={!isEmpty(errors)}
              >
                {c('create')}
              </Button>
            </Stack>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};
