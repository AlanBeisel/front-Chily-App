'use client';

import { showToast } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
            newPassword: newPassword,
          }),
        },
      );
      if (response.ok) {
        showToast('success', <p>Contraseña restablecida con éxito.</p>);
        // router.push('/login');
      } else {
        showToast('error', <p>Error al restablecer contraseña.</p>);
        // router.push('/register');
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('error', <p>Hubo un problema durante el proceso.</p>);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nueva contraseña:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <button type="submit">Restablecer contraseña</button>
    </form>
  );
}

export default function Auth() {
  return (
    <div>
      <ResetPassword />
    </div>
  );
}
