'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';

type User = {
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async (_email: string, _password: string) => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      setUser({ username: 'example_user', email: 'example@example.com' });
    }
  }, []);

  //TODO Modificar flujo mockeado
  const login = async (email: string, _password: string) => {
    try {
      const accessToken = 'mockAccessToken';
      setCookie('accessToken', accessToken);

      setUser({ username: 'mockUsername', email });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const logout = () => {
    deleteCookie('accessToken');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
