import { useState } from 'react';

import {
  Box,
  Divider,
  IconButton,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BsChatDotsFill } from 'react-icons/bs';
import { HiDotsVertical } from 'react-icons/hi';
import { MdCancel } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import { AvatarWithStatus } from 'components/Avatar';

import { useAuthToken } from 'hooks/api/useAuthToken';
import { usePrivateChannels } from 'hooks/api/usePrivateChannels';
import {
  ERelationshipType,
  TUserRelationship,
} from 'hooks/api/useUserRelationships';

import { apiClient } from 'utils/apiClient';

type Props = {
  relationship: TUserRelationship;
};

const MotionListItem = motion(ListItem);

export const Relationship: React.FC<Props> = ({ relationship }) => {
  const navigate = useNavigate();
  const token = useAuthToken();
  const [acceptLoading, setAcceptLoading] = useState(false);
  const { data: privateChannels } = usePrivateChannels();

  const handleAccept = async () => {
    setAcceptLoading(true);

    try {
      await apiClient(`users/me/relationships/${relationship.id}`, {
        token,
        data: {
          status: 'accepted',
        },
        method: 'PATCH',
      });
      setAcceptLoading(false);
    } catch (error) {
      setAcceptLoading(false);
    }
  };

  // const handleDecline = async () => {

  // }

  const handleDelete = async () => {
    await apiClient(`users/me/relationships/${relationship.id}`, {
      token,
      method: 'DELETE',
    });
  };

  const renderOptions = () => {
    if (relationship.type === ERelationshipType.ACCEPTED) {
      return (
        <>
          <IconButton
            variant="dark"
            aria-label="Message"
            icon={<BsChatDotsFill size="18px" />}
          ></IconButton>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HiDotsVertical size="18px" />}
              variant="dark"
            ></MenuButton>
            <MenuList bg="gray.800" border="0">
              <MenuItem bg="gray.800" onClick={handleDelete}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      );
    }

    if (relationship.type === ERelationshipType.SENT_PENDING) {
      return (
        <Tooltip label="Cancel" hasArrow placement="top">
          <IconButton
            variant="dark"
            aria-label="Cancel"
            icon={<MdCancel size="18px" />}
          ></IconButton>
        </Tooltip>
      );
    }

    if (relationship.type === ERelationshipType.RECEIVED_PENDING) {
      return (
        <>
          <Tooltip label="Accept" hasArrow placement="top">
            <IconButton
              variant="dark"
              aria-label="Accept"
              onClick={handleAccept}
              isLoading={acceptLoading}
              icon={<TiTick size="18px" />}
            ></IconButton>
          </Tooltip>
          <Tooltip label="Decline" hasArrow placement="top">
            <IconButton
              variant="dark"
              aria-label="Decline"
              icon={<MdCancel size="18px" />}
            ></IconButton>
          </Tooltip>
        </>
      );
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (relationship.type === ERelationshipType.ACCEPTED) {
      const channel = privateChannels?.find(privateChannel => {
        let userFound = false;

        for (let user of privateChannel.users) {
          userFound = user.id === relationship.user.id;
          if (userFound) {
            break;
          }
        }

        return userFound;
      });
      navigate(`/channels/@me/${channel?.id}`);
    } else {
      console.log('we will open modal with user data if possible');
    }
  };

  return (
    <MotionListItem
      key={relationship.id}
      _hover={{ bg: 'gray.600' }}
      rounded="md"
      cursor="pointer"
      px="2"
      mt="0.5"
      // onClick={handleClick}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5 }}
      transition={{ type: 'spring', stiffness: '100' }}
    >
      <Divider borderColor="gray.600" top="-1px" position="relative" />
      <Stack
        py="4"
        direction="row"
        display="flex"
        justifyContent="space-between"
      >
        <Stack flex="1" direction="row">
          <Box>
            <AvatarWithStatus
              status="online"
              src={relationship.user.avatar}
              name={relationship.user.username}
            />
          </Box>
          <Box pl="2" display="flex" alignItems="center">
            <Text fontSize="md" fontWeight="semibold">
              {relationship.user.username}
            </Text>
          </Box>
        </Stack>
        <Stack spacing={3} direction="row">
          {renderOptions()}
        </Stack>
      </Stack>
    </MotionListItem>
  );
};
