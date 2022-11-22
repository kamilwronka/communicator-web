import { useCallback, useState } from 'react';

import { Box, Button, Flex, Text, VStack, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';

import { TextField } from 'components';
import { AvatarField } from 'components';

import { useAuthToken } from 'hooks/common/useAuthToken';

import { useTranslation } from 'react-i18next';

import { apiClient } from 'utils/apiClient';
import { imageUploadApiClient } from 'utils/imageUploadApiClient';

import { AnimatedStepElement } from './AnimatedWizardElement';

type Props = {
  onSuccessfulSubmit: () => void;
};

const INITIAL_VALUES = {
  username: '',
  profile_picture: '',
  profile_picture_file: {} as File,
};

export const CreateProfileForm: React.FC<Props> = ({ onSuccessfulSubmit }) => {
  const [isLoading, setLoading] = useState(false);
  const token = useAuthToken();
  const { t } = useTranslation('intro');
  const { t: commonTranslation } = useTranslation('intro');
  const toast = useToast();

  const validationSchema = object({
    username: string()
      .required(t('form.username.error.required', undefined))
      .min(3, t('form.username.error.tooShort', undefined))
      .max(30, t('form.username.error.tooLong', undefined)),
  });

  const onSubmit = useCallback(
    async ({
      username,
      profile_picture_file,
    }: {
      username: string;
      profile_picture_file: File;
    }) => {
      setLoading(true);

      if (token) {
        try {
          let key, uploadUrl;

          if (profile_picture_file instanceof File) {
            ({ key, uploadUrl } = await apiClient<{
              key: string;
              uploadUrl: string;
            }>('/users/me/profilePicture', {
              method: 'POST',
              token,
              data: {
                filename: profile_picture_file.name,
                fileSize: profile_picture_file.size,
              },
            }));

            await imageUploadApiClient(uploadUrl, {
              data: profile_picture_file,
            });
          }

          await apiClient('users/profile', {
            token,
            data: {
              profilePictureKey: key,
              username: username,
            },
            method: 'POST',
          });
          onSuccessfulSubmit();
        } catch (error) {
          toast({
            title: commonTranslation('form.error'),
            description: commonTranslation('form.unexpected'),
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        }
      }

      setLoading(false);
    },
    [token, commonTranslation, toast, onSuccessfulSubmit],
  );

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
    >
      {({ values }) => (
        <Form style={{ width: '100%', height: '100%' }}>
          <Flex direction="column" align="center" pt="12">
            <AnimatedStepElement>
              <VStack>
                <AvatarField
                  tooltipText={t('form.profilePicture.tooltip')}
                  name="profile_picture"
                />
                <Text fontSize="xl" fontWeight="semibold">
                  {values.username ? values.username : 'Username'}
                </Text>
              </VStack>
            </AnimatedStepElement>
            <AnimatedStepElement>
              <TextField
                id="username"
                type="name"
                name="username"
                placeholder={t<string>('form.username.placeholder')}
                helperText={t('form.username.hint')}
                label={t('form.username.label')}
              />
            </AnimatedStepElement>
            <AnimatedStepElement>
              <Box mt="12" display="flex" justifyContent="center">
                <Button type="submit" variant="green" isLoading={isLoading}>
                  {t('form.submitButton.continue')}
                </Button>
              </Box>
            </AnimatedStepElement>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
