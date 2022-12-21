import React, { useCallback, useState } from 'react';

import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';

// import {Success} from 'components/animations';
import { useUser } from 'hooks/api/useUserData';

import { useTranslation } from 'react-i18next';

import { AnimatedStepElement } from './AnimatedWizardElement';
import { AnimatedWizardStep } from './AnimatedWizardStep';
import { CreateProfileForm } from './CreateProfileForm';

export const CreateProfileWizard: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { t } = useTranslation('intro');
  const { mutate } = useUser();

  const setIndex = (index: number) => {
    setActiveTabIndex(index);
  };

  const handleMoveForward = useCallback(() => {
    setIndex(activeTabIndex + 1);
  }, [activeTabIndex]);

  const revalidate = () => {
    mutate();
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      w="full"
      h="full"
      p="4"
    >
      <Box height="full" width="full" rounded="lg">
        <AnimatedWizardStep active={activeTabIndex === 0}>
          <Box pt="4">
            <AnimatedStepElement>
              <Heading size="lg">{t('header.main')}</Heading>
            </AnimatedStepElement>
            <AnimatedStepElement>
              <Text size="md">{t('header.sub')}</Text>
            </AnimatedStepElement>
          </Box>
          <CreateProfileForm onSuccessfulSubmit={handleMoveForward} />
        </AnimatedWizardStep>
        <AnimatedWizardStep active={activeTabIndex === 1}>
          <VStack>{/* <Success /> */}</VStack>
          <AnimatedStepElement>
            <VStack mt="24" spacing={2}>
              <Heading size="md">{t('form.summary.heading')}</Heading>
              <Text>{t('form.summary.text')}</Text>
            </VStack>
          </AnimatedStepElement>
          <AnimatedStepElement>
            <VStack mt="12">
              <Button variant="green" onClick={revalidate}>
                {t('form.submitButton.submit')}
              </Button>
            </VStack>
          </AnimatedStepElement>
        </AnimatedWizardStep>
      </Box>
    </Flex>
  );
};
