
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user || !profile) {
        console.log('Utilisateur non connecté, redirection vers /login');
        navigate('/login');
        return;
      }

      if (requiredRole && profile.role !== requiredRole) {
        console.log(`Accès refusé: rôle requis "${requiredRole}", rôle utilisateur "${profile.role}"`);
        navigate('/login');
        return;
      }
    }
  }, [user, profile, isLoading, navigate, requiredRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="glass-card p-8 rounded-xl">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!user || !profile || (requiredRole && profile.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
