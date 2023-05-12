import { Flex } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export const SettingsModalNavigation: React.FC<Props> = ({ children }) => {
  return (
    <Flex w="72" direction="column" alignItems="flex-end" pt="2">
      {children}
    </Flex>
  );
};
