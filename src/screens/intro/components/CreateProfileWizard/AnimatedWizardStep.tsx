import {Box, BoxProps} from '@chakra-ui/react';
import {motion} from 'framer-motion';

const MotionBox = motion<BoxProps>(Box);

const stepContentVariant = {
  active: {
    display: 'block',
    transition: {
      staggerChildren: 0.1,
      duration: 0.3,
    },
    opacity: 1,
  },
  inactive: {
    display: 'none',
    opacity: 0,
  },
};

export interface IAnimatedWizardStepProps {
  active: boolean;
  children: React.ReactNode;
}

export const AnimatedWizardStep: React.FC<IAnimatedWizardStepProps> = ({
  children,
  active,
}) => {
  return (
    <MotionBox
      height="full"
      width="full"
      rounded="lg"
      variants={stepContentVariant}
      animate={active ? 'active' : 'inactive'}
      initial="active"
    >
      {children}
    </MotionBox>
  );
};
