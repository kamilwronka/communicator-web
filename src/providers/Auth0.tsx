import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Auth0: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    VITE_AUTH0_AUDIENCE,
    VITE_AUTH0_CLIENT_ID,
    VITE_AUTH0_SCOPE,
    VITE_AUTH0_DOMAIN,
  } = import.meta.env;

  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={VITE_AUTH0_DOMAIN}
      clientId={VITE_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={VITE_AUTH0_AUDIENCE}
      scope={VITE_AUTH0_SCOPE}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0;
