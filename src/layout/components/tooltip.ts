import {ComponentStyleConfig} from '@chakra-ui/react';

const tooltipBase: ComponentStyleConfig = {
  baseStyle: {
    bg: 'gray.700',
  },
  variants: {
    dark: (props: any) => ({
      // bg: 'green.500',
      _hover: {bg: 'green.600'},
      _focus: {bg: 'green.600'},
    }),
  },
};

export default tooltipBase;
