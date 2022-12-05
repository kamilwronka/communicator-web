import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useUser } from 'hooks/common/useUserData';

type Props = {
  children: React.ReactElement;
};

export const Protected: React.FC<Props> = ({ children }) => {
  const { data: user } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (user?.username === null) {
      navigate(
        `/intro?return=${pathname === '/' ? '/channels/@me' : pathname}`,
      );
    }
  }, [user?.username, navigate, pathname]);

  return user?.username ? children : null;
};
