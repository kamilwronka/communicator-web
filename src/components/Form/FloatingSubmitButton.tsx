import { RefObject, useState } from 'react';

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { motion } from 'framer-motion';
import { usePopper } from 'react-popper';

type Props = {
  containerRef: RefObject<HTMLDivElement>;
};

const MotionFlex = motion(Flex);

export const FloatingSubmitButton: React.FC<Props> = ({ containerRef }) => {
  const { dirty, resetForm } = useFormikContext();
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(
    containerRef?.current,
    popperElement,
    {
      modifiers: [{ name: 'offset', options: { offset: [-24, -180] } }],
    },
  );

  const handleReset = () => {
    resetForm();
  };

  return dirty ? (
    <MotionFlex
      bottom="48"
      justifyContent="space-between"
      alignItems="center"
      px="8"
      bg="gray.800"
      borderRadius="xl"
      height="16"
      width="calc(100% - 24rem)"
      ref={setPopperElement}
      zIndex={2000}
      boxShadow="xl"
      style={styles.popper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      {...attributes.popper}
    >
      <Text>You have unsaved changes.</Text>
      <Box>
        <Button variant="unstyled" mr="6" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="green" type="submit">
          Save
        </Button>
      </Box>
    </MotionFlex>
  ) : null;
};
