'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { useAuth } from './AuthContext';

const GoogleCallback = () => {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get('state');

    if (state) {
      const decodedData = decodeURIComponent(state);
      const userData = JSON.parse(decodedData);
      setCookie('access_token', userData.access_token);
      login(userData.user.email, 'N/A', userData.user.role);
      router.push('/');
    } else {
      router.push('/register');
    }
  }, [router, login]);

  return <div>Redirigiendo...</div>;
};

export default GoogleCallback;
