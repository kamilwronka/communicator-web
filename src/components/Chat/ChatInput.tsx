import React, {
  ClipboardEvent,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Box, Flex, useToast } from '@chakra-ui/react';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
  MentionData,
  defaultSuggestionsFilter,
} from '@draft-js-plugins/mention';
import { EditorState, Modifier, SelectionState, convertToRaw } from 'draft-js';
import { isEmpty, reduce } from 'lodash';

import { CHAT_MESSAGES_MAX_ATTACHMENT_SIZE } from 'config/chat';

import { ChatInputAttachmentsContainer } from './ChatInputAttachmentsContainer';
import { ChatInputMention } from './ChatInputMention';
import { ChatInputSuggestionItem } from './ChatInputSuggestionItem';
import { ChatInputSuggestionsContainer } from './ChatInputSuggestionsContainer';

type Props = {
  onEnter: (value: string, suggestions: any, attachments: File[]) => void;
  placeholder: string;
  mentions?: MentionData[];
  maxAttachments?: number;
};

type MentionSearchEvent = {
  value: string;
};

export const ChatInput: React.FC<Props> = ({
  onEnter,
  placeholder,
  mentions,
  maxAttachments,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(40);
  const [files, setFiles] = useState<File[]>([]);
  const toast = useToast();
  const ref = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions);

  const resizeObserver = useCallback(
    () =>
      new ResizeObserver(entries => {
        for (let entry of entries) {
          setHeight(entry.contentRect.height);
        }
      }),
    [],
  );

  useLayoutEffect(() => {
    resizeObserver().observe(containerRef.current as Element);
  }, [resizeObserver]);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      mentionComponent: props => <ChatInputMention {...props} />,
    });
    const { MentionSuggestions } = mentionPlugin;
    const plugins = [mentionPlugin];

    return { plugins, MentionSuggestions };
  }, []);

  const onSearchChange = useCallback(
    ({ value }: MentionSearchEvent) => {
      mentions && setSuggestions(defaultSuggestionsFilter(value, mentions));
    },
    [mentions],
  );

  const handleBeforeInput = () => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;

    if (currentContentLength > 2000) {
      return 'handled';
    }

    return 'not-handled';
  };

  const handlePastedText = () => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;

    if (currentContentLength > 2000) {
      return 'handled';
    }

    return 'not-handled';
  };

  const keyBindingFn = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      return 'send-message';
    }

    return undefined;
  };

  const resetInput = () => {
    setFiles([]);

    let newEditorState = editorState;
    let contentState = editorState.getCurrentContent();
    const firstBlock = contentState.getFirstBlock();
    const lastBlock = contentState.getLastBlock();
    const allSelected = new SelectionState({
      anchorKey: firstBlock.getKey(),
      anchorOffset: 0,
      focusKey: lastBlock.getKey(),
      focusOffset: lastBlock.getLength(),
      hasFocus: true,
    });
    contentState = Modifier.removeRange(contentState, allSelected, 'backward');
    newEditorState = EditorState.push(
      editorState,
      contentState,
      'remove-range',
    );

    newEditorState = EditorState.forceSelection(
      newEditorState,
      contentState.getSelectionAfter(),
    );
    setEditorState(newEditorState);
  };

  const handleKeyCommand = (command: string) => {
    if (command === 'send-message') {
      const currentContent = editorState.getCurrentContent().getPlainText();
      const { entityMap } = convertToRaw(editorState.getCurrentContent());
      let messagePayload = currentContent;

      const mentions = Object.values(entityMap).map(entity => {
        const { mention } = entity.data;
        messagePayload = messagePayload.replace(
          mention.name,
          `<@${mention.user_id}>`,
        );

        return mention;
      });

      onEnter(messagePayload, mentions, files);
      resetInput();

      return 'handled';
    }

    return 'not-handled';
  };

  const handlePaste = ({ clipboardData: { items } }: ClipboardEvent) => {
    if (maxAttachments && files.length >= maxAttachments) {
      toast({
        title: `Max ${maxAttachments} attachments`,
        status: 'info',
        isClosable: true,
      });

      return;
    }

    const filesArray = reduce(
      items,
      (acc: File[], item) => {
        if (item.kind === 'file') {
          const blob = item.getAsFile();
          if (blob) {
            if (blob.size >= CHAT_MESSAGES_MAX_ATTACHMENT_SIZE) {
              toast({
                title: `Max file size is ${
                  CHAT_MESSAGES_MAX_ATTACHMENT_SIZE / 1000000
                }MB`,
                status: 'info',
                isClosable: true,
              });
            } else {
              acc.push(blob);
            }
          }
        }

        return acc;
      },
      [],
    );
    setFiles(files => [...files, ...filesArray]);
  };

  const handleAttachmentDelete = (index: number) => {
    setFiles(files => files.filter((value, i) => index !== i));
  };

  return (
    <Flex direction="column" px="6" py="4" maxW="100%">
      {!isEmpty(files) && (
        <ChatInputAttachmentsContainer
          files={files}
          onDelete={handleAttachmentDelete}
        />
      )}

      <Box position="relative">
        <Box
          onPaste={handlePaste}
          ref={containerRef}
          cursor="text"
          py="2"
          px="4"
          bg="gray.600"
          borderRadius={!isEmpty(files) ? 'none' : 'lg'}
          borderBottomRadius="lg"
          maxHeight="120px"
          maxWidth="100%"
          width="100%"
          wordBreak="break-all"
          onClick={() => {
            ref.current!.focus();
          }}
          overflowY="auto"
        >
          <Editor
            editorKey={'editor'}
            editorState={editorState}
            onChange={setEditorState}
            plugins={plugins}
            ref={ref}
            placeholder={placeholder}
            handleBeforeInput={handleBeforeInput}
            handlePastedText={handlePastedText}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={keyBindingFn}
          />
          <MentionSuggestions
            open={open}
            onOpenChange={setOpen}
            suggestions={suggestions ? suggestions : []}
            onSearchChange={onSearchChange}
            entryComponent={ChatInputSuggestionItem}
            popoverContainer={props => (
              <ChatInputSuggestionsContainer
                containerHeight={height}
                {...props}
              />
            )}
          />
        </Box>
      </Box>
    </Flex>
  );
};
