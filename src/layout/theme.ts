import { ThemeOverride, extendTheme } from '@chakra-ui/react';

import Box from './components/box';
import Button from './components/button';
import Divider from './components/divider';
import Input from './components/input';
import Text from './components/text';
import Tooltip from './components/tooltip';

const overrides: ThemeOverride = {
  styles: {
    global: {
      body: {
        bg: 'gray.800',
        color: 'white',
      },
    },
  },
  components: {
    Button,
    Input,
    Divider,
    Tooltip,
    Box,
    Text,
  },
};

export default extendTheme(overrides);
