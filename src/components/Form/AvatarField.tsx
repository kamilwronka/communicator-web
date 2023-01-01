import { useRef, useState } from 'react';

import {
  Box,
  Circle,
  IconButton,
  Input,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { MdDelete } from 'react-icons/md';
import { RiImageAddFill } from 'react-icons/ri';

import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from 'config/avatarUpload';

import { useTranslation } from 'react-i18next';

import { Avatar } from '../Avatar';

type Props = {
  name: string;
  tooltipText: string;
};

export const AvatarField: React.FC<Props> = ({
  tooltipText,
  name,
  ...props
}) => {
  const [src, setSrc] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { t } = useTranslation('common');

  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleImagePicker = () => {
    inputRef.current?.click();
  };

  const handleDelete = () => {
    setFieldValue(`${name}_file`, {});
    field.onChange('');
    setSrc('');
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    field.onChange(e);

    if (!isEmpty(files) && !isNil(files)) {
      if (files[0].size > MAX_FILE_SIZE) {
        toast({
          title: t('form.error'),
          description: t('form.fileTooBig'),
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });

        return;
      }

      const objectURL = URL.createObjectURL(files[0]);

      setSrc(objectURL);
      setFieldValue(`${name}_file`, files[0]);
    }
  };

  return (
    <>
      <Avatar size="2xl" mb="4" src={src}>
        <Box position="absolute" top="-30px" right="-10px" zIndex={999}>
          <Tooltip label={tooltipText} hasArrow placement="right" bg="gray.800">
            <IconButton
              colorScheme="green"
              aria-label="set-profile-picture"
              icon={<RiImageAddFill />}
              rounded="full"
              onClick={handleImagePicker}
            />
          </Tooltip>
        </Box>
        <Circle
          position="absolute"
          size="32"
          color="transparent"
          transition="0.3s"
          cursor="default"
          role="group"
          _hover={
            src
              ? {
                  bg: 'black',
                  opacity: '0.75',
                }
              : {}
          }
        >
          <IconButton
            colorScheme="unstyled"
            aria-label="set-profile-picture"
            icon={<MdDelete size="32px" />}
            rounded="full"
            w="full"
            h="full"
            onClick={handleDelete}
            color="transparent"
            cursor="default"
            _groupHover={src ? { color: 'white', cursor: 'pointer' } : {}}
          />
        </Circle>
      </Avatar>
      <Input
        {...field}
        {...props}
        onChange={handleInputChange}
        ref={inputRef}
        display="none"
        name={name}
        type="file"
        accept={ALLOWED_FILE_TYPES}
      />
    </>
  );
};
