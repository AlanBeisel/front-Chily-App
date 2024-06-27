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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const router = useRouter();

  function handleGoogleLogin() {
    router.push('https://chilyapp.onrender.com/auth/google/login');
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
        type="button"
        variant="submit"
        size="submit"
        className="w-[320px] bg-white h-[40px] text-black mb-[15px]"
      >
        Ingresar con google
      </Button>
    </Form>
  );
}
