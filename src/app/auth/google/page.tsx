'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { showToast } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function Search() {
  const router = useRouter();
  const { login } = useAuth();

  const searchParams = useSearchParams();
  const stateUrl = searchParams.get('state');
  const state = stateUrl ? JSON.parse(decodeURIComponent(stateUrl)) : false;

  useEffect(() => {
    if (state) {
      login(state.user, state.access_token);
      showToast('success', <p>Has iniciado seccion con google.</p>);
      router.push('/');
    } else {
      showToast(
        'error',
        <p>
          Hubo un problema durante el inicio de sesión, por favor intenta de
          nuevo
        </p>,
      );
      router.push('/login');
    }
  }, []);

  return <></>;
}

export default function Auth() {
  return (
    <div>
      <Suspense>
        <Search />
      </Suspense>
    </div>
  );
}
