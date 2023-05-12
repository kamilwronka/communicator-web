import { Flex, Text } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export const SettingsModalNavigationHeader: React.FC<Props> = ({
  children,
}) => {
  return (
    <Flex justifyContent="flex-start" w="48" mt="4">
      <Text fontWeight="bold" fontSize="sm" color="gray.400" casing="uppercase">
        {children}
      </Text>
    </Flex>
  );
};
