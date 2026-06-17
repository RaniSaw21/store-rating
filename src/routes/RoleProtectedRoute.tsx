import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { UserRole } from '../types';

interface RoleProtectedRouteProps {
  allowedRoles: UserRole[];
}

export default function RoleProtectedRoute({ allowedRoles }: RoleProtectedRouteProps) {
  const { role, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
