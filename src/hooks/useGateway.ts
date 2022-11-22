import { useContext } from 'react';

import { GatewayContext } from 'contexts/GatewayContext';

export const useGateway = () => {
  const value = useContext(GatewayContext);

  return { ...value };
};
