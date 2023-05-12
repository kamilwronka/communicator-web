import { useServerRoles } from '../../../../../hooks/api/useServerRoles';

export const Roles: React.FC = () => {
  const { data: roles } = useServerRoles();

  console.log(roles);

  return <div>roles</div>;
};
