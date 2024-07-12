'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/contexts/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles: ('user' | 'admin' | 'superadmin')[];
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      !isLoading &&
      (!isAuthenticated || !user || !allowedRoles.includes(user.role))
    ) {
      router.replace('/');
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, router]);

  if (isLoading) {
    return <div>Cargando...</div>; // O cualquier componente de carga que prefieras
  }

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default RouteGuard;
