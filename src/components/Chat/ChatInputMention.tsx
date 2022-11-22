import { ReactNode } from 'react';

import { Box } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
};

export const ChatInputMention: React.FC<Props> = ({ children }) => {
  return (
    <Box as="span" bg="blue.600" w="auto" rounded="md" p="0.5">
      @{children}
    </Box>
  );
};
