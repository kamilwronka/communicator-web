const button = {
  baseStyle: {
    fontWeight: 'bold',
  },
  sizes: {
    xl: {
      h: '56px',
      fontSize: 'lg',
      px: '32px',
    },
  },
  variants: {
    'with-shadow': {
      bg: 'red.400',
      boxShadow: '0 0 2px 2px #efdfde',
    },
    green: (props: any) => ({
      bg: 'green.500',
      _hover: { bg: 'green.600' },
      _focus: { bg: 'green.600' },
      color: 'white',
    }),
    dark: (props: any) => ({
      bg: 'gray.800',
      _hover: { bg: 'gray.700' },
      _focus: { bg: 'gray.700' },
      color: 'gray.300',
    }),
  },
};

export default button;
