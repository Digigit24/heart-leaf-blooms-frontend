import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/app/store/auth.store';
import { PATHS } from './paths';

export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // 1. Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to appropriate login based on the intended path or role
    if (allowedRoles.includes('admin')) {
      return <Navigate to={PATHS.ADMIN_LOGIN} state={{ from: location }} replace />;
    }
    if (allowedRoles.includes('vendor')) {
      return <Navigate to={PATHS.VENDOR_LOGIN} state={{ from: location }} replace />;
    }
    return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />;
  }

  // 2. Check Role Permissions (if roles are specified)
  if (allowedRoles.length > 0 && user?.role) {
    if (!allowedRoles.includes(user.role)) {
      // User is logged in but unauthorized for this section
      // Redirect to their dashboard or home
      if (user.role === 'admin') return <Navigate to={PATHS.ADMIN_DASHBOARD} replace />;
      if (user.role === 'vendor') return <Navigate to={PATHS.VENDOR_DASHBOARD} replace />;
      return <Navigate to={PATHS.HOME} replace />;
    }
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (isAuthenticated) {
    // If already logged in, redirect away from login pages
    if (user?.role === 'admin') return <Navigate to={PATHS.ADMIN_DASHBOARD} replace />;
    if (user?.role === 'vendor') return <Navigate to={PATHS.VENDOR_DASHBOARD} replace />;
    return <Navigate to={PATHS.HOME} replace />;
  }

  return <Outlet />;
};