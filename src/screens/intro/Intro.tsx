import { useEffect } from 'react';

import { Box, Flex, Image } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CreateProfileWizard } from './components/CreateProfileWizard';

import { useUser } from 'hooks/common/useUserData';

export const Intro: React.FC = () => {
  const { data: user } = useUser();
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    if (user?.username) {
      const searchParams = new URLSearchParams(search);
      const returnURL = searchParams.get('return');

      if (returnURL) {
        navigate(returnURL);
        return;
      }

      navigate(`/channels/@me`);
    }
  }, [user?.username, navigate, search]);

  return (
    <Box w="100vw" h="100vh">
      <Image
        src="/assets/images/intro-bg.webp"
        w="full"
        h="full"
        resize="none"
        objectFit="cover"
        loading={'lazy'}
      />
      <Flex
        as="section"
        pos="absolute"
        h="full"
        w="full"
        alignItems="center"
        justifyContent="center"
        boxShadow="2xl"
        top="0"
      >
        <Box maxW="lg" w="lg" h="xl" bg="gray.700" borderRadius="lg">
          <CreateProfileWizard />
        </Box>
      </Flex>
    </Box>
  );
};
