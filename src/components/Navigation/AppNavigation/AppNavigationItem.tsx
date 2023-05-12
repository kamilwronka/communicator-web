import { Avatar, Box, Tooltip } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

type Props = {
  id?: string;
  name?: string;
  src?: string;
  href?: string;
  isActive?: boolean;
};

export const AppNavigationItem: React.FC<Props> = ({
  id,
  name,
  src,
  href,
  isActive,
}) => {
  const { serverId } = useParams();
  // workaround for updating paths
  const value = localStorage
    .getItem(`${id}/lastVisitedChannel`)
    ?.replace(/"/g, '');

  const lastVisitedChannel = value ? `/${value}` : '';
  const active = isActive || serverId === id;
  const navigationUrl = href ? href : `/channels/${id}${lastVisitedChannel}`;

  return (
    <Link to={navigationUrl}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingTop="1"
        paddingBottom="1"
        bg={active ? 'gray.600' : 'gray.900'}
        borderRadius="lg"
        width="16"
        transition={'0.3s background'}
      >
        <Tooltip label={name} placement="right" hasArrow>
          <Box>
            <Avatar src={src} size="md" name={name} />
          </Box>
        </Tooltip>
      </Box>
    </Link>
  );
};
