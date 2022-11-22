import { forwardRef, useRef } from 'react';

import { Box, Spinner, useColorModeValue as mode } from '@chakra-ui/react';
import { differenceInCalendarDays, differenceInMinutes } from 'date-fns';
import InfiniteScroll from 'react-infinite-scroll-component';

import { TChatMessage } from 'hooks/useChatMessages';

import { ChatMessage } from './ChatMessage';

type Props = {
  messages: TChatMessage[];
  onScroll: () => void;
  finished: boolean;
  loading: boolean;
  endMessage?: React.ReactNode;
};

export const ChatMessagesContainer = forwardRef<HTMLDivElement, Props>(
  ({ messages, onScroll, finished, endMessage }, ref) => {
    const lastSender = useRef('1');
    const prevDate = useRef('');

    return (
      <Box
        flex="1"
        id="scrollable-chat-container"
        display="flex"
        pt="6"
        mr="2"
        mt="2"
        flexDirection="column-reverse"
        overflowY="auto"
        overflowX="hidden"
        margin={{ top: '2', right: '2', bottom: '2' }}
        sx={{
          '&::-webkit-scrollbar-track': {
            bg: mode('whiteAlpha.300', 'blue.600'),
            borderRadius: '20px',
          },
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            bg: mode('gray.900', 'blue.600'),
            borderRadius: '20px',
          },
        }}
      >
        <InfiniteScroll
          dataLength={messages.length}
          next={onScroll}
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
            overflowX: 'hidden',
          }}
          scrollThreshold={400}
          inverse={true}
          hasMore={!finished}
          endMessage={endMessage}
          loader={
            <Box
              height="300px"
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner size="lg" />
            </Box>
          } //walkaround as its required
          scrollableTarget="scrollable-chat-container"
        >
          <div ref={ref}>
            {messages.map((message, i) => {
              const { author, created_at, nonce, _id } = message;
              const msgDate = new Date(created_at).getTime();
              const prevMsgDate = new Date(prevDate.current).getTime();

              const shouldRenderUserDetails =
                i === 0 ||
                lastSender.current !== author.user_id ||
                differenceInMinutes(msgDate, prevMsgDate) >= 10;

              const renderDivider =
                differenceInCalendarDays(msgDate, prevMsgDate) === 1 || i === 0;

              lastSender.current = author.user_id;
              prevDate.current = created_at;

              return (
                <ChatMessage
                  key={_id || nonce}
                  optimistic={!_id}
                  shouldRenderUserDetails={shouldRenderUserDetails}
                  renderDivider={renderDivider}
                  message={message}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      </Box>
    );
  },
);
