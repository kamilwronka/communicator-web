import { useState } from 'react';

import { Button, HStack, Stack } from '@chakra-ui/react';

import { AddRelationshipModal } from './AddRelationshipModal';

type Props = {
  filter: string;
  onChange: (filter: string) => void;
};

const filterButtons = [
  {
    label: 'Online',
    filter: 'online',
  },
  {
    label: 'All',
    filter: 'all',
  },
  {
    label: 'Pending',
    filter: 'pending',
  },
];

export const RelationshipsMenu: React.FC<Props> = ({ filter, onChange }) => {
  const [isAddFriendModalOpen, toggleAddFriendModal] = useState(false);

  const openModal = () => {
    toggleAddFriendModal(true);
  };

  const closeModal = () => {
    toggleAddFriendModal(false);
  };

  const renderButtons = () => {
    return filterButtons.map(button => {
      return (
        <Button
          key={button.filter}
          variant="gray"
          bg={filter === button.filter ? 'gray.800' : 'inherit'}
          onClick={() => onChange(button.filter)}
        >
          {button.label}
        </Button>
      );
    });
  };

  return (
    <HStack pl="4" pr="4" justifyContent="space-between" h="16">
      <Stack direction="row">{renderButtons()}</Stack>
      <Button variant="green" onClick={openModal}>
        Add Friend
      </Button>
      <AddRelationshipModal
        isOpen={isAddFriendModalOpen}
        onClose={closeModal}
      />
    </HStack>
  );
};
