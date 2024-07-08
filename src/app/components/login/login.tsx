'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/app/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import Link from 'next/link';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { showToast } from '@/lib/utils';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  email: z
    .string()
    .email({ message: 'Debe ser un correo electrónico válido.' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener por lo menos 8 caracteres.' })
    .regex(/[a-z]/, {
      message: 'La contraseña debe contener al menos una letra minúscula.',
    })
    .regex(/[A-Z]/, {
      message: 'La contraseña debe contener al menos una letra mayúscula.',
    })
    .regex(/[0-9]/, {
      message: 'La contraseña debe contener al menos un número.',
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'La contraseña debe contener al menos un carácter especial.',
    }),
});

export function LoginForm() {
  const { login } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { watch, trigger } = form;
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const subscription = watch(() => {
      trigger();
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        {
          method: 'POST',
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        },
      );

      if (response.status === 201) {
        const data = await response.json();
        login(data.user, data.access_token);
        showToast('success', <p>Has iniciado sesión correctamente</p>);
        router.push("/address")
      } else {
        showToast(
          'error',
          <p>
            Hubo un problema durante el inicio de sesión, por favor intenta de
            nuevo
          </p>,
        );
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      showToast(
        'error',
        <p>
          Ocurrió un error durante el inicio de sesión, por favor intenta de
          nuevo más tarde
        </p>,
      );
    }
  }

  function handleGoogleLogin() {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[310px]">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="correo electronico" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="text-red-600 relative">
                <FormControl>
                  <Input
                    placeholder="Contraseña"
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                  />
                </FormControl>
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="submit" size="submit">
          Iniciar sesión
        </Button>
      </form>
      <h2 className="text-sm font-regular mt-[15px]">
        {
          <Link href="/req-reset" className="underline font-semibold">
            Has olvidado tu contraseña?
          </Link>
        }
      </h2>
      <h2 className="text-sm font-regular mt-[15px]">
        {
          <Link href="/register" className="underline font-semibold">
            Crea una cuenta nueva
          </Link>
        }
      </h2>
      <Button
        onClick={handleGoogleLogin}
        type="submit"
        variant="submit"
        size="submit"
        className="w-[320px] bg-white h-[40px] text-black mb-[15px]"
      >
        Ingresar con google
      </Button>
    </Form>
  );
}
