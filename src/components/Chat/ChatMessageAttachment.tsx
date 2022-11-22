import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Progress,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AiFillFile } from 'react-icons/ai';

import type { Attachment } from 'hooks/useChatMessages';
import { useFileURL } from 'hooks/useFileURL';

import { ChatMessageImagePreview } from './ChatMessageImagePreview';

type Props = {
  file: Attachment;
  optimistic: boolean;
};

export const ChatMessageAttachment: React.FC<Props> = ({
  file,
  optimistic,
}) => {
  const type = file instanceof File ? file.type : file.mimeType;

  const { fileURL } = useFileURL(
    file instanceof File && type.includes('image') ? file : undefined,
  );
  const { isOpen, onClose, onToggle } = useDisclosure();

  const src = file instanceof File ? fileURL : file.url;
  const isImage = type.includes('image');

  return (
    <Box py={isImage ? '4' : '2'} onClick={onToggle}>
      {isImage && (
        <>
          <Image
            cursor="pointer"
            maxHeight="64"
            src={src}
            objectFit="scale-down"
            opacity={optimistic ? '0.6' : 1}
          />
          <ChatMessageImagePreview
            isOpen={isOpen}
            onClose={onClose}
            fileSrc={src}
          />
        </>
      )}
      {!isImage && (
        <Flex bg="gray.800" p="2" maxWidth="96">
          <Box>
            <Icon as={AiFillFile} height="12" width="12" />
          </Box>
          <Box maxWidth={72}>
            {optimistic ? (
              <>
                <Text>Processing...</Text>
                <Progress
                  width={72}
                  mt="1"
                  size="sm"
                  isIndeterminate
                  borderRadius="lg"
                />
              </>
            ) : (
              <>
                <Link href={src} download>
                  <Text color="blue.400" noOfLines={1}>
                    {src}
                  </Text>
                </Link>
                <Text color="gray.500">123.12 MB</Text>
              </>
            )}
          </Box>
        </Flex>
      )}
    </Box>
  );
};
