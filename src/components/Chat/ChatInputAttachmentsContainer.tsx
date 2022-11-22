import { Box } from '@chakra-ui/react';

import { ChatInputAttachment } from './ChatInputAttachment';

type Props = {
  files: File[];
  onDelete: (index: number) => void;
};

export const ChatInputAttachmentsContainer: React.FC<Props> = ({
  files,
  onDelete,
}) => {
  return (
    <Box
      px="4"
      pb="4"
      bg="gray.600"
      borderTopRadius="lg"
      borderBottomRadius="none"
    >
      <Box
        width="full"
        overflowX="auto"
        overflowY="hidden"
        whiteSpace="nowrap"
        pt="8"
        pb="0"
        bg="gray.600"
        sx={{
          '&::-webkit-scrollbar-track': {
            bg: 'whiteAlpha.100',
            borderRadius: '20px',
          },
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            bg: 'gray.700',
            borderRadius: '20px',
          },
        }}
      >
        {files.map((file, index) => {
          return (
            <ChatInputAttachment
              key={index}
              index={index}
              file={file}
              onDelete={onDelete}
            />
          );
        })}
      </Box>
    </Box>
  );
};
