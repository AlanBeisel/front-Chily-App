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
import { toast } from 'react-toastify';

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
    address: z
      .string()
      .min(5, { message: 'La dirección debe tener al menos 5 caracteres.' }),
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
      .min(10, { message: 'El teléfono debe tener al menos 10 caracteres.' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir.',
    path: ['confirmPassword'],
  });

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      email: '',
      password: '',
      confirmPassword: '',
      nin: '',
      phone: '',
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('precionado');
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
            phone: values.phone,
          }),
        },
      );
      if (response.status === 201) {
        alert('Te has registrado correctamente, por favor inicia sesión');
        router.push('/login');
      } else {
        alert(
          'Hubo un problema durante el registro, por favor intenta de nuevo',
        );
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
      alert(
        'Ocurrió un error durante el registro, por favor intenta de nuevo más tarde',
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Direccion" {...field} />
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
              <FormControl>
                <Input placeholder="Contraseña" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Repetir contraseña"
                  {...field}
                  type="password"
                />
              </FormControl>
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
                <Input placeholder="Teléfono" {...field} />
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
        {
          <Link href="/login" className="underline font-semibold">
            logueado
          </Link>
        }
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
