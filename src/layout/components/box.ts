import { ComponentStyleConfig } from '@chakra-ui/react';

const boxBase: ComponentStyleConfig = {
  baseStyle: {
    sx: {
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
    },
  },
};

export default boxBase;
