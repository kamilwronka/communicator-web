import { useParams } from 'react-router-dom';

import { NavigationItem, NavigationItemProps } from './NavigationItem';

type Props = {
  id: string;
};

export const ServerNavigationItem: React.FC<
  Omit<NavigationItemProps, 'href' | 'isActive'> & Props
> = ({ id, name, src }) => {
  const { serverId } = useParams();
  // workaround for updating paths
  const value = localStorage
    .getItem(`${id}/lastVisitedChannel`)
    ?.replace(/"/g, '');

  const lastVisitedChannel = value ? `/${value}` : '';
  const isActive = serverId === id;

  return (
    <NavigationItem
      name={name}
      src={src}
      href={`/channels/${id}${lastVisitedChannel}`}
      isActive={isActive}
    />
  );
};
