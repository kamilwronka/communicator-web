import { ReactNode } from 'react';

import { Box, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type Props = {
  href?: string;
  active?: boolean;
  label?: string;
  icon?: ReactNode;
};

export const DirectMessagesItem: React.FC<Props> = ({
  href,
  active,
  label,
  icon,
}) => {
  return (
    <Link to={href ? href : '/channels/@me'}>
      <Stack
        w="full"
        cursor="pointer"
        userSelect="none"
        rounded="md"
        px="4"
        py="2"
        transition="all 0.2s"
        bg={active ? 'gray.700' : undefined}
        _hover={{ bg: 'gray.700' }}
        _active={{ bg: 'gray.600' }}
        direction="row"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="lg"
          px="2"
          py="2"
        >
          {icon}
        </Box>
        <Box display="flex" alignItems="center" pl="2">
          <Text fontSize="md" fontWeight="semibold">
            {label}
          </Text>
        </Box>
      </Stack>
    </Link>
  );
};
