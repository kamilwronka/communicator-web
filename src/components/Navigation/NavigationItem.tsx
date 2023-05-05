import { Avatar, Box, Tooltip } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export interface NavigationItemProps {
  name?: string | undefined;
  src?: string | undefined;
  href: string;
  isActive?: boolean;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  name,
  href,
  src,
  isActive,
}: NavigationItemProps) => {
  return (
    <Link to={href}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingTop="1"
        paddingBottom="1"
        bg={isActive ? 'gray.600' : 'gray.900'}
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
