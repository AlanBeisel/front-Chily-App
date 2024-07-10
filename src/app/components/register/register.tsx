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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { showToast } from '@/lib/utils';

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'El nombre debe tener al menos 3 caracteres.' }),
    email: z
      .string()
      .email({ message: 'Debe ser un correo electrónico válido.' }),
    password: z
      .string()
      .min(8, {
        message: 'La contraseña debe tener por lo menos 8 caracteres.',
      })
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
    confirmPassword: z.string(),
    nin: z
      .string()
      .min(6, { message: 'El NIN debe tener al menos 6 caracteres.' })
      .regex(/^\d+$/, { message: 'El NIN debe contener solo números.' }),
    phone: z
      .string()
      .min(10, { message: 'El teléfono debe tener al menos 10 caracteres.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir.',
    path: ['confirmPassword'],
  });

type FormSchema = z.infer<typeof formSchema>;

export function RegisterForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      nin: '',
      phone: '',
    },
    mode: 'onChange',
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

  async function onSubmit(values: FormSchema) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            NIN: values.nin,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            phone: `+57${values.phone}`,
          }),
        },
      );
      if (response.status === 201) {
        showToast(
          'success',
          <p>Te has registrado correctamente, por favor inicia sesión</p>,
        );
        router.push('/login');
      } else {
        const res = await response.json();
        console.error('Error durante el registro:', res);
        showToast(
          'error',
          <p>Hubo un problema durante el registro, {res.message}</p>,
        );
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
      showToast(
        'error',
        <p>
          Ocurrió un error durante el registro, por favor intenta de nuevo más
          tarde
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nombre completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Correo electronico" {...field} />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <div className="text-red-600 relative">
                <FormControl>
                  <Input
                    placeholder="Repetir contraseña"
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="NIN" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-row items-center">
                  <span className="m-2">+52</span>
                  <Input placeholder="7751488347" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="submit" size="submit">
          Registrarme
        </Button>
      </form>
      <h2 className="text-sm font-regular mt-[15px]">
        ¿ya estas{' '}
        <Link href="/login" className="underline font-semibold">
          logueado
        </Link>
        ?
      </h2>
      <Button
        onClick={handleGoogleLogin}
        type="submit"
        variant="submit"
        size="submit"
        className="w-[320px] bg-white h-[40px] text-black mb-[15px]"
      >
        Registrarme con google
      </Button>
    </Form>
  );
}
