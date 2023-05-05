import { Center, Divider } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';

import { CDN_URL } from '../../config/cdn';

import { useServers } from 'hooks/api/useServers';

import { ServerNavigationItem } from './ServerNavigationItem';

export const ServerNavigation: React.FC = () => {
  const { data: servers } = useServers();

  return (
    <>
      {servers?.map(server => {
        const iconSrc = server.icon ? `${CDN_URL}/${server.icon}` : '';

        return (
          <ServerNavigationItem
            key={server.id}
            id={server.id}
            name={server.name}
            src={iconSrc}
          />
        );
      })}
      {!isEmpty(servers) && (
        <Center mt="2">
          <Divider w="12" />
        </Center>
      )}
    </>
  );
};
