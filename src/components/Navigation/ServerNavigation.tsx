import { Center, Divider } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';

import { useServers } from 'hooks/servers/useServers';

import { ServerNavigationItem } from './ServerNavigationItem';

export const ServerNavigation: React.FC = () => {
  const { data: servers } = useServers();

  return (
    <>
      {servers?.map(server => (
        <ServerNavigationItem
          key={server.id}
          id={server.id}
          name={server.name}
          src={server.icon}
        />
      ))}
      {!isEmpty(servers) && (
        <Center mt="2">
          <Divider w="12" />
        </Center>
      )}
    </>
  );
};
