import { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';

export function useAuthToken(): string {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      getAccessTokenSilently().then((retrievedToken: string) => {
        setToken(retrievedToken);
      });
    }
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  return token;
}
