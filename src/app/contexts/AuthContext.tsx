'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';

type Role = 'user' | 'admin' | 'superAdmin';

type User = {
  username: string;
  email: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isUser: () => boolean;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async (_email: string, _password: string) => {},
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
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      // Mockear un usuario en el efecto useEffect
      setUser({
        username: 'mockUser',
        email: 'mockUser@example.com',
        role: 'user',
      });
      setIsAuthenticated(true);
    } else {
      // Si no hay token, podemos establecer uno para simular un usuario logueado
      setCookie('accessToken', 'mockAccessToken');
      setUser({
        username: 'mockUser',
        email: 'mockUser@example.com',
        role: 'user',
      });
      setIsAuthenticated(true);
    }
  }, []);

  // Mockear un usuario en la función login
  const login = async (email: string, _password: string) => {
    try {
      const accessToken = 'mockAccessToken';
      setCookie('accessToken', accessToken);

      // Simulamos un delay para imitar una llamada a API

      await new Promise((resolve) => setTimeout(resolve, 500));

      setUser({ username: 'mockUsername', email, role: 'admin' });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const logout = () => {
    deleteCookie('accessToken');
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
