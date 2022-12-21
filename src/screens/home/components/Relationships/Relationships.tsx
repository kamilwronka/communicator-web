import { useCallback, useMemo, useState } from 'react';

import { Box, Divider, List } from '@chakra-ui/react';
import { AnimatePresence, Reorder } from 'framer-motion';
import noop from 'lodash/noop';

import { SearchInput } from 'components';

import {
  ERelationshipType,
  useUserRelationships,
} from 'hooks/api/useUserRelationships';

import { Relationship } from './Relationship';
import { RelationshipsMenu } from './RelationshipsMenu';

export const Relationships: React.FC = () => {
  const { data: relationships } = useUserRelationships();

  const [filter, setFilter] = useState('all'); //default filter
  const [query, setQuery] = useState('');

  const filteredByQuery = useMemo(() => {
    return relationships?.filter(relationship =>
      relationship.user.username?.toLowerCase().includes(query.toLowerCase()),
    );
  }, [relationships, query]);

  const renderRelationships = useCallback(() => {
    const filtered = filteredByQuery?.filter(relationship => {
      switch (filter) {
        case 'pending':
          return (
            relationship.type === ERelationshipType.SENT_PENDING ||
            relationship.type === ERelationshipType.RECEIVED_PENDING
          );
        case 'all':
          return relationship.type === ERelationshipType.ACCEPTED;
        case 'blocked':
          return relationship.type === ERelationshipType.DECLINED;
        default:
          return true;
      }
    });

    return filtered?.map(relationship => {
      return (
        <Reorder.Item
          dragListener={false}
          key={relationship.id}
          value={relationship}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          as="div"
          transition={{ stiffness: 250, duration: 0.2 }}
        >
          <Relationship key={relationship.id} relationship={relationship} />
        </Reorder.Item>
      );
    });
  }, [filter, filteredByQuery]);

  return (
    <>
      <RelationshipsMenu filter={filter} onChange={setFilter} />
      <Divider />
      <Box p="4">
        <SearchInput onSearch={setQuery} bg="gray.800" placeholder="Search" />
      </Box>
      <Box p="4" flex="1" pb="200px">
        <AnimatePresence>
          <List
            h="full"
            pr="2"
            overflowY="scroll"
            sx={{
              '&::-webkit-scrollbar-track': {
                bg: 'whiteAlpha.100',
                borderRadius: '20px',
              },
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                bg: 'gray.900',
                borderRadius: '20px',
              },
            }}
          >
            <Reorder.Group
              values={relationships ? relationships : []}
              onReorder={noop}
              as="div"
              layoutScroll
              style={{ listStyleType: 'none' }}
            >
              {renderRelationships()}
            </Reorder.Group>
          </List>
        </AnimatePresence>
      </Box>
    </>
  );
};
