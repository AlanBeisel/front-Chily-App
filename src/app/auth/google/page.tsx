'use client';

import { useAuth } from '@/app/contexts/AuthContext';
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
      //TODO toast notification.
      router.push('/');
    } else {
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
