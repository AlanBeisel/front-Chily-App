'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { showToast } from '@/lib/utils';
import { Button } from '../components/ui/button';

const formSchema = z.object({
  email: z
    .string()
    .email({ message: 'Debe ser un correo electrónico válido.' }),
});

function ReqResetpass() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/request-password-reset`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (response.status === 201) {
        await response.json();
        showToast('success', <p>Te enviamos un correo a tu email.</p>);
      } else {
        showToast('error', <p>Hubo un problema, intenta nuevamente</p>);
      }
    } catch (error) {
      showToast('error', <p>Hubo un problema al restablecer la contraseña</p>);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full h-full bg-red-500 items-center justify-start rounded-xl text-white font-semibold pt-[64px]">
      <h1 className="text-[40px]">Donde chily</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[310px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="correo electrónico" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="submit" size="submit">
            Recuperar contraseña
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ReqResetpass;
