import { Box } from '@chakra-ui/react';

export interface NavigationItemProps {
  isActive?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  isActive,
  onClick,
  children,
}: NavigationItemProps) => {
  return (
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
      onClick={onClick}
    >
      {children}
    </Box>
  );
};
