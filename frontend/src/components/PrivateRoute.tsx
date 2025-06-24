import { useSelector } from 'react-redux';
import type { RootState } from '../store';

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
