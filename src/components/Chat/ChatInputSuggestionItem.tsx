import React, { MouseEvent, ReactElement } from 'react';

import { Box, Stack, Text } from '@chakra-ui/react';
import { MentionData, MentionPluginTheme } from '@draft-js-plugins/mention';

import { AvatarWithStatus } from 'components/Avatar';

export interface EntryComponentProps {
  className?: string;
  onMouseDown(event: MouseEvent): void;
  onMouseUp(event: MouseEvent): void;
  onMouseEnter(event: MouseEvent): void;
  role: string;
  id: string;
  'aria-selected'?: boolean | 'false' | 'true';
  theme?: MentionPluginTheme;
  mention: MentionData;
  isFocused: boolean;
  searchValue?: string;
}

export function ChatInputSuggestionItem(
  props: EntryComponentProps,
): ReactElement {
  const {
    mention,
    theme,
    searchValue,
    isFocused,
    // @ts-ignore
    selectMention,
    ...parentProps
  } = props;

  return (
    <Box {...parentProps} width="full" bg="gray.800" cursor="pointer">
      <Stack
        direction="row"
        p="2"
        rounded="lg"
        background={isFocused ? 'gray.600' : 'gray.800'}
        width="full"
      >
        <Box>
          <AvatarWithStatus
            name={mention.name}
            src={mention.avatar ? mention.avatar : ''}
            status="online"
          />
        </Box>

        <Stack direction="row" justify="center" align="center" pl="2">
          <Text fontWeight="semibold">{mention.name}</Text>
        </Stack>
      </Stack>
    </Box>
  );
}
