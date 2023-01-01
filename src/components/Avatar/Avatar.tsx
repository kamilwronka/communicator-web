import { AvatarProps, Avatar as ChakraAvatar } from '@chakra-ui/react';

import { CDN_URL } from '../../config/cdn';

export const Avatar: React.FC<AvatarProps> = ({ src, ...props }) => {
  return <ChakraAvatar src={`${CDN_URL}/${src}`} {...props} />;
};
