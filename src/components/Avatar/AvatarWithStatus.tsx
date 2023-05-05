import { Avatar, AvatarBadge } from '@chakra-ui/react';

type Props = {
  status: 'online' | 'offline';
  name: string | undefined;
  src: string | undefined;
};

export const AvatarWithStatus: React.FC<Props> = ({ name, status, src }) => {
  const badgeColor = status === 'online' ? 'green.500' : 'gray.200';

  return (
    <Avatar size="sm" name={name} src={src}>
      <AvatarBadge
        boxSize="1em"
        bg={badgeColor}
        border="2px solid transparent"
      />
    </Avatar>
  );
};
