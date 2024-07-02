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

  const router = useRouter();

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
        alert('Has iniciado sesión correctamente');
        router.push('/');
      } else {
        alert(
          'Hubo un problema durante el inicio de sesión, por favor intenta de nuevo',
        );
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      alert(
        'Ocurrió un error durante el inicio de sesión, por favor intenta de nuevo más tarde',
      );
    }
  }

  function handleGoogleLogin() {
    <Link href="/register" className="underline font-semibold">
      registrado
    </Link>;
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
              <FormControl>
                <Input placeholder="contraseña" {...field} type="password" />
              </FormControl>
              <FormMessage className="text-white" />
            </FormItem>
          )}
        />
        <Button type="submit" variant="submit" size="submit">
          Iniciar sesión
        </Button>
      </form>
      <h2 className="text-sm font-regular mt-[15px]">
        ¿Aún no estás{' '}
        {
          <Link href="/register" className="underline font-semibold">
            registrado
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
        Ingresar con google
      </Button>
    </Form>
  );
}
