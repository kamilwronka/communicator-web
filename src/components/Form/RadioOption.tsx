import { ReactNode } from 'react';

import { Box, Text, useRadio } from '@chakra-ui/react';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';

export type Option = {
  value: string;
  header: string;
  description: string;
  icon?: ReactNode;
};

type Props = {
  option: Option;
};

export const RadioOption: React.FC<Props> = ({ option, ...props }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w="full">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        boxShadow="dark"
        _checked={{
          bg: 'gray.600',
          color: 'white',
          boxShadow: 'lg',
        }}
        bg="gray.800"
        px={5}
        py={3}
        display="flex"
        flexDir="row"
      >
        <Box display="flex" justifyContent="center" alignItems="center" pr="4">
          {option.icon}
        </Box>
        <Box flex="1">
          <Text fontWeight="semibold" fontSize="md">
            {option.header}
          </Text>
          <Text fontSize="md">{option.description}</Text>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          {/* @ts-ignore */}
          {input.checked ? (
            <IoMdRadioButtonOn fontSize="1.4rem" />
          ) : (
            <IoMdRadioButtonOff fontSize="1.4rem" />
          )}
        </Box>
      </Box>
    </Box>
  );
};
