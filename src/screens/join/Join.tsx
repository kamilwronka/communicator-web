import { useState } from 'react';

import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuthToken } from 'hooks/api/useAuthToken';
import { useInvite } from 'hooks/api/useInvite';
import { Server, useServers } from 'hooks/api/useServers';

import { apiClient } from 'utils/apiClient';

export const Join: React.FC = () => {
  const { data: invite } = useInvite();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = useAuthToken();
  const { mutate } = useServers();

  const handleJoin = async () => {
    setLoading(true);
    try {
      const response = await apiClient<Server>(
        `/servers/${invite?.server.id}/members`,
        {
          method: 'POST',
          data: { inviteId: invite?.id },
          token,
        },
      );
      setLoading(false);
      mutate(servers => [...(servers ? servers : []), ...[response]], {
        revalidate: false,
      });

      navigate(`/channels/${invite?.server.id}`);
    } catch (error) {
      setLoading(false);
      toast({
        description: 'Unable to join',
        title: 'Error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box position="relative" h="100vh" w="full">
      <Image
        src="https://d1fs8ljxwyzba6.cloudfront.net/assets/editorial/2016/09/nomanssky-header.jpg"
        objectFit="cover"
        resize="both"
        h="full"
        w="full"
      />
      <Flex
        as="section"
        pos="absolute"
        h="full"
        w="full"
        alignItems="center"
        justifyContent="center"
        boxShadow="2xl"
        color="white"
        top="0"
      >
        <Box minW="lg" maxW="lg" bg="gray.700" borderRadius="lg">
          <Box bg="bg-surface" borderRadius="lg" p={{ base: '4', md: '6' }}>
            <VStack
              direction={{ base: 'column', md: 'row' }}
              spacing={{ base: '5', md: '6' }}
              justify="space-between"
            >
              <Stack spacing="1">
                <VStack>
                  <Image
                    src={
                      invite?.server.server_image_url ||
                      '/assets/images/default-image-placeholder.png'
                    }
                    border="10px solid transparent"
                    borderColor="transparent"
                    boxSizing="content-box"
                    h="40"
                    w="40"
                    borderRadius="full"
                    top="-24"
                    position="relative"
                  />
                  <Text
                    fontSize="2xl"
                    fontWeight="semibold"
                    top="-16"
                    position="relative"
                  >
                    {invite?.server.name}
                  </Text>
                </VStack>

                <Text
                  fontSize="md"
                  fontWeight="normal"
                  position="relative"
                  top="-8"
                  wordBreak="break-word"
                >
                  You have received an invitation to the {invite?.server.name}{' '}
                  server
                </Text>
              </Stack>
              <Box>
                <Button
                  variant="green"
                  onClick={handleJoin}
                  isLoading={loading}
                >
                  Join {invite?.server.name}
                </Button>
              </Box>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
