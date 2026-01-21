import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';


interface AuthContextType {
  token: string | null;
  role: 'admin' | 'student' | null;
  login: (token: string, role: 'admin' | 'student') => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean; // <--- Add this
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [role, setRole] = useState<'admin' | 'student' | null>(
    localStorage.getItem('role') as 'admin' | 'student' | null
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // const login = (newToken: string, newRole: 'admin' | 'student') => {
  //   localStorage.setItem('token', newToken);
  //   localStorage.setItem('role', newRole);
  //   setToken(newToken);
  //   setRole(newRole);

  //   if (newRole === 'admin') {
  //     navigate('/admin/dashboard');
  //   } else {
  //     navigate('/student/dashboard');
  //   }
  // };
const login = (newToken: string, newRole: 'admin' | 'student') => {
  if (newRole === 'admin') {
    localStorage.setItem('adminToken', newToken); // <-- match interceptor
  } else {
    localStorage.setItem('studentToken', newToken);
  }
  localStorage.setItem('role', newRole);
  setToken(newToken);
  setRole(newRole);

  if (newRole === 'admin') {
    navigate('/admin/dashboard');
  } else {
    navigate('/student/dashboard');
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
    navigate('/');
  };

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   const storedRole = localStorage.getItem('role');
  //   if (storedToken && storedRole) {
  //     setToken(storedToken);
  //     setRole(storedRole as 'admin' | 'student');
  //   }
  // }, []);
  
useEffect(() => {
    const role = localStorage.getItem('role');
    const storedToken = role === 'admin' 
      ? localStorage.getItem('adminToken') 
      : localStorage.getItem('studentToken');

    if (storedToken && role) {
      setToken(storedToken);
      setRole(role as 'admin' | 'student');
    }
    setIsLoading(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        login,
        logout,
        isAuthenticated: !!token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
