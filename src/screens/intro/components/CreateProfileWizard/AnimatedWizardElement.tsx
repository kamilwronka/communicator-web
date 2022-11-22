import {Box, BoxProps} from '@chakra-ui/react';
import {motion} from 'framer-motion';

type Props = {
  children: React.ReactNode;
};

const MotionBox = motion<BoxProps>(Box);

const stepElementVariant = {
  active: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  inactive: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.3,
    },
  },
};

export const AnimatedStepElement: React.FC<Props> = ({children}) => {
  return (
    <MotionBox w="100%" px="6" variants={stepElementVariant}>
      {children}
    </MotionBox>
  );
};
