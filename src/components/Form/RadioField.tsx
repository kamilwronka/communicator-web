import React from 'react';

import { InputProps, VStack, useRadioGroup } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';

import { Option, RadioOption } from './RadioOption';

type Props = {
  helperText?: string;
  label?: string;
  name: string;
  options: Option[];
};

export const RadioField: React.FC<InputProps & Props> = ({
  label,
  helperText,
  name,
  options,
  ...props
}) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue: field.value,
    onChange: (value: string) => setFieldValue(name, value),
  });

  const group = getRootProps();

  const renderRadioButtons = () => {
    return options.map((option, i) => {
      const radio = getRadioProps({ value: option.value });
      return <RadioOption key={option.value} option={option} {...radio} />;
    });
  };

  return <VStack {...group}>{renderRadioButtons()}</VStack>;
};
