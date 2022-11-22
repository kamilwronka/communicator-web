import {ComponentStyleConfig} from '@chakra-ui/react';

const inputBase: ComponentStyleConfig = {
  variants: {
    dark: (props: any) => ({
      // bg: 'green.500',
      _hover: {bg: 'green.600'},
      _focus: {bg: 'green.600'},
    }),
  },
};

export default inputBase;
