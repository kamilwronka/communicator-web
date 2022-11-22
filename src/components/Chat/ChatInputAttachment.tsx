import { Box, Flex, Icon, IconButton, Image, Text } from '@chakra-ui/react';
import { AiFillFile, AiOutlineClose } from 'react-icons/ai';

import { useFileURL } from 'hooks/useFileURL';

type Props = {
  index: number;
  file: File;
  onDelete: (index: number) => void;
};

export const ChatInputAttachment: React.FC<Props> = ({
  index,
  file,
  onDelete,
}) => {
  const { fileURL } = useFileURL(
    file.type.includes('image') ? file : undefined,
  );

  return (
    <Box
      p="2"
      bg="gray.800"
      rounded="lg"
      mr="4"
      position="relative"
      display="inline-block"
    >
      {file.type.includes('image') ? (
        <Image src={fileURL} width="40" height="40" objectFit="scale-down" />
      ) : (
        <Flex
          width="40"
          height="40"
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Icon as={AiFillFile} height="20" width="20" />
          <Text size="sm" noOfLines={1} maxWidth="36" mt="4">
            {file.name}
          </Text>
        </Flex>
      )}
      <IconButton
        colorScheme="red"
        position="absolute"
        top="-3"
        right="-2"
        aria-label="delete image"
        size="sm"
        rounded="full"
        icon={<AiOutlineClose />}
        onClick={() => onDelete(index)}
      />
    </Box>
  );
};
