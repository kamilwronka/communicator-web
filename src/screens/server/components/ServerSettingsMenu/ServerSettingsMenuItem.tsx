import { ReactNode } from 'react';

import { MenuItem } from '@chakra-ui/react';

type Props = {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
};

const ServerSettingsMenuItem: React.FC<Props> = ({ label, onClick, icon }) => {
  return (
    <MenuItem
      display="flex"
      justifyContent="space-between"
      p="2"
      _hover={{ bg: 'gray.600' }}
      _focus={{ bg: 'gray.500' }}
      rounded="md"
      onClick={onClick}
      bg="gray.700"
    >
      {label} {icon}
    </MenuItem>
  );
};

export default ServerSettingsMenuItem;
