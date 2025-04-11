import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface Props {
  children: JSX.Element;
  allowedRole: 'user';
}

export const ProtectedRoute = ({ children, allowedRole }: Props) => {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== allowedRole) return <div>Недостаточно прав</div>;

  return children;
};
