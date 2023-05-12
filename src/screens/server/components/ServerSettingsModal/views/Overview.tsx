import { useRef } from 'react';

import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import { AvatarField } from '../../../../../components';
import { FloatingSubmitButton } from '../../../../../components/Form/FloatingSubmitButton';

import { useServerData } from '../../../../../hooks/api/useServerData';

type FormValues = {
  icon: string;
};

export const Overview: React.FC = () => {
  const { data: server } = useServerData();
  const containerRef = useRef<HTMLDivElement>(null);

  const INITIAL_VALUES: FormValues = {
    icon: '',
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Flex direction="column">
      <Heading size="lg">Server Overview</Heading>

      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form>
          <Box
            mt="4"
            height="100vh"
            overflow="clip"
            id="form-container"
            overflowY="auto"
            ref={containerRef}
            display="flex"
            flexDirection="column"
            sx={{
              '&::-webkit-scrollbar-track': {
                bg: 'whiteAlpha.300',
                borderRadius: '8px',
              },
              '&::-webkit-scrollbar': {
                height: '4px',
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                bg: 'gray.800',
                borderRadius: '20px',
              },
            }}
          >
            <AvatarField name="icon" tooltipText="Server icon" />
            <FloatingSubmitButton containerRef={containerRef} />
          </Box>
        </Form>
      </Formik>
    </Flex>
  );
};
