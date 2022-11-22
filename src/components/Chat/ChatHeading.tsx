import { Box, Heading } from '@chakra-ui/react';

type Props = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

export const ChatHeading: React.FC<Props> = ({ icon, children }) => {
  return (
    <Box height="16" display="flex" alignItems="center" px="6">
      <Heading size="md">{icon}</Heading>
      <Heading size="md" ml="2">
        {children}
      </Heading>
    </Box>
  );
};
