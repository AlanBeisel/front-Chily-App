'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { /*setCookie*/ deleteCookie, getCookie } from 'cookies-next';

type Role = 'user' | 'admin' | 'superAdmin';

type User = {
  username: string;
  email: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: Role) => void;
  logout: () => void;
  isUser: () => boolean;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: (_email: string, _password: string, _role: Role) => {},
  logout: () => {},
  isUser: () => false,
  isAdmin: () => false,
  isSuperAdmin: () => false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = getCookie('access_token');
    if (accessToken) {
      // TODO leer los datos desde el token, por ahora lo mockeamos.
      setUser({
        username: 'example_user',
        email: 'example@example.com',
        role: 'user',
      });
    }
  }, []);

  const login = (email: string, _password: string, role: Role) => {
    setUser({ username: 'mockUsername', email, role });
  };

  const logout = () => {
    deleteCookie('access_token');
    setUser(null);
    setIsAuthenticated(false); 
  };

  const isUser = () => user?.role === 'user';
  const isAdmin = () => user?.role === 'admin';
  const isSuperAdmin = () => user?.role === 'superAdmin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        isUser,
        isAdmin,
        isSuperAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
