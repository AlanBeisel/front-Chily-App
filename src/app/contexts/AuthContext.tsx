'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';
import { Address } from '@/types';

type Role = 'user' | 'admin' | 'superAdmin';

interface Credential {
  id: string;
  NIN: string;
  phone: string;
}



interface User {
  id: string;
  role: Role;
  name: string;
  NIN: string;
  email: string;
  googleAuth: boolean;
  phone: string;
  creditCardNumber: string;
  virtualWallet: string;
  preferredPaymentMethod: string;
  deletedAt: string | null;
  credential: Credential;
}

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  address: Address | null;
  setAddress: (address: Address) => void;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  isUser: () => boolean;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  address: null,
  setAddress: (_address: Address) => {},
  login: (_user: User, _accessToken: string) => {},
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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   console.log(user, accessToken)
  // }, [user, accessToken])


  useEffect(() => {
    const storedUser = getCookie('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedAccessToken = getCookie('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      setIsAuthenticated(true);
    }

  const storedAddress = getCookie('address');
    if (storedAddress) {
      setAddress(JSON.parse(storedAddress));
    }
  }, []);

  const login = (user: User, accessToken: string) => {
    setCookie('accessToken', accessToken);
    setAccessToken(accessToken);
    setCookie('user', JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    deleteCookie('accessToken');
    deleteCookie('user');
    deleteCookie('address');
    setUser(null);
    setAccessToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('cartItems');
  };

  const isUser = () => user?.role === 'user';
  const isAdmin = () => user?.role === 'admin';
  const isSuperAdmin = () => user?.role === 'superAdmin';

   const setAddressAndStoreCookie = (newAddress: Address) => {
     setAddress(newAddress);
     setCookie('address', JSON.stringify(newAddress)); // Guardar dirección en cookie
   };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        address,
        setAddress: setAddressAndStoreCookie,
        isUser,
        isAdmin,
        isSuperAdmin,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
