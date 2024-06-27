'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { /*setCookie*/ deleteCookie, getCookie } from 'cookies-next';

type User = {
  username: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: (_email: string, _password: string, _role: string) => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const accessToken = getCookie('access_token');
    if (accessToken) {
      // Aquí podrías hacer una llamada a la API para obtener los datos del usuario con el access_token
      setUser({
        username: 'example_user',
        email: 'example@example.com',
        role: 'user',
      });
    }
  }, []);

  const login = (email: string, _password: string, role: string) => {
    setUser({ username: 'mockUsername', email, role });
  };

  const logout = () => {
    deleteCookie('access_token');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
