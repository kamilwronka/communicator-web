import { Box, Text } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
  containerHeight: number;
};

export const ChatInputSuggestionsContainer: React.FC<Props> = ({
  children,
  containerHeight,
  ...props
}) => {
  return (
    <Box
      width="full"
      position="absolute"
      bottom={`${containerHeight + 40}px`}
      left="0px"
      bg="gray.800"
      rounded="lg"
      padding="2"
      cursor="default"
      boxShadow="dark-lg"
      zIndex={99999}
    >
      <Text fontWeight="semibold" color="whiteAlpha.600" fontSize="xs" p="2">
        MEMBERS
      </Text>
      <Box mt="2">{children}</Box>
    </Box>
  );
};
