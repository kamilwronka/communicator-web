import React, { ReactNode } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { useField } from 'formik';

interface ITextFieldProps {
  helperText: string;
  label: string;
  name: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  disableErrors?: boolean;
}

export const TextField: React.FC<InputProps & ITextFieldProps> = ({
  label,
  helperText,
  name,
  iconLeft,
  iconRight,
  disableErrors,
  ...props
}) => {
  const [field, meta] = useField(name);
  const isInvalid = !!meta.error && meta.touched && !disableErrors;

  const renderHelperOrError = () => {
    if (isInvalid) {
      return <FormErrorMessage>{meta.error}</FormErrorMessage>;
    }

    return <FormHelperText>{helperText}</FormHelperText>;
  };

  return (
    <FormControl pt="6" isInvalid={isInvalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        {iconLeft && <InputLeftElement>{iconLeft}</InputLeftElement>}
        <Input {...field} {...props} />
        {iconRight && <InputRightElement>{iconRight}</InputRightElement>}
      </InputGroup>
      {renderHelperOrError()}
    </FormControl>
  );
};
