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
import { BiUserVoice } from 'react-icons/bi';
import { BsHash } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { object, string } from 'yup';

import { RadioField, TextField } from 'components';

import { useAuthToken } from 'hooks/api/useAuthToken';
import { ServerChannel, useServerChannels } from 'hooks/api/useServerChannels';

import { useTranslation } from 'react-i18next';

import { NavigationParams } from 'navigation/types';

import { apiClient } from 'utils/apiClient';

type Props = {
  onClose: () => void;
  parent?: ServerChannel;
};

type FormValues = {
  name: string;
  type: string;
};

const MIN_CHARACTERS = 1;
const MAX_CHARACTERS = 128;

export const CreateChannelForm: React.FC<Props> = ({ onClose, parent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { serverId } = useParams<NavigationParams>();
  const token = useAuthToken();
  const { mutate } = useServerChannels();
  const navigate = useNavigate();
  const { t } = useTranslation('server', { keyPrefix: 'forms.createChannel' });
  const { t: c } = useTranslation('common');
  const toast = useToast();

  const validationSchema = object({
    name: string()
      .required(t('name.error.required', undefined))
      .min(MIN_CHARACTERS, t('name.error.tooShort', undefined))
      .max(MAX_CHARACTERS, t('name.error.tooLong', undefined)),
  });

  const initialValues = { name: '', type: 'TEXT' };

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await apiClient<ServerChannel>(`/channels`, {
        method: 'POST',
        data: {
          ...values,
          parentId: parent?.id,
          serverId,
        },
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
      navigate(`/channels/${serverId}/${response.id}`);
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
      {({ values, errors }) => (
        <Form>
          <ModalBody color="white">
            <RadioField
              name="type"
              options={[
                {
                  header: t('type.text.header', ''),
                  description: t('type.text.description', ''),
                  value: 'TEXT',
                  icon: <BsHash fontSize="1.6rem" />,
                },
                {
                  header: t('type.voice.header', ''),
                  description: t('type.voice.description', ''),
                  value: 'VOICE',
                  icon: <BiUserVoice fontSize="1.6rem" />,
                },
              ]}
            />
            <TextField
              name="name"
              label={t('name.label', '')}
              helperText={t('name.helperText', '')}
              placeholder={t<string>('name.placeholder')}
              bg="gray.800"
              border="0"
              disableErrors
              autoFocus
              iconLeft={
                values.type === 'TEXT' ? (
                  <BsHash fontSize="1.2rem" />
                ) : (
                  <BiUserVoice fontSize="1.2rem" />
                )
              }
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
