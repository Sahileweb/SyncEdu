// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   allowedRole: 'admin' | 'student';
// }

// export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
//   const { isAuthenticated, role } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   if (role !== allowedRole) {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// }



import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
   allowedRole: ('admin' | 'superadmin' | 'student')[];
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // ✅ check if user's role is in allowedRoles array
  if (!allowedRole.includes(role as 'admin' | 'superadmin' | 'student')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
