// ProtectedRoute.tsx
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ElementType;
  [key: string]: any;
}

const ProtectedRoute = ({ component: Component, ...rest }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      element={token ? <Component {...rest} /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
