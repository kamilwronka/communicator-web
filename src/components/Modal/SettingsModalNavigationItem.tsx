import { Flex } from '@chakra-ui/react';

type Props = {
  title: string;
  onClick: () => void;
  active: boolean;
};

export const SettingsModalNavigationItem: React.FC<Props> = ({
  title,
  onClick,
  active,
}) => {
  return (
    <Flex
      justifyContent="flex-start"
      w="48"
      onClick={onClick}
      borderRadius="md"
      bg={active ? 'gray.600' : 'gray.800'}
      _hover={{ bg: active ? 'gray.600' : 'gray.700' }}
      fontWeight="bold"
      px="3"
      py="1"
      mt="2"
      transition="0.1s"
      fontSize="md"
      cursor="pointer"
    >
      {title}
    </Flex>
  );
};
