import { Navigate } from 'react-router-dom'
import NotFound from '../page/NotFound'
import { Role } from '../services/openapi'
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

interface Props {
  component: React.ComponentType
  path?: string
  roles: Array<Role>
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent, roles }) => {
  const user = useAppSelector((state: RootState) => state.reducers.user.currentUser);
  const isAuthenticated = useAppSelector((state: RootState) => state.reducers.user.authenticated);
  const userHasRequiredRole = user && roles.includes(user.role ?? 0) ? true : false;

  if (isAuthenticated && userHasRequiredRole) {
    return <RouteComponent />
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <NotFound />
  }

  return <Navigate to="/" />
}