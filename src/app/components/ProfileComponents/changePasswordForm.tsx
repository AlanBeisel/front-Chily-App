'use client'
import { showToast } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import {useEffect, useState} from  'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/app/components/ui/form";
import { Input } from "../ui/input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Button } from "../ui/button";

interface ChangePasswordProps{
  token:string;
}

const ChangePasswordForm: React.FC<ChangePasswordProps>= ({token}) => {
  const formSchema = z.object({
    currentPassword: z.string(),
    password: z.string().min(8, {message: 'La contraseña debe tener por lo menos 8 caracteres.'})
  .regex(/[a-z]/, {
    message: 'La contraseña debe tener al menos una letra minúscula',})
  .regex(/[0-9]/,{
    message: 'La contraseña debe contener al menos un número.',})
  .regex(/[^a-zA-Z0-9]/,{
    message: 'La contraseña debe contener al menos un carácter especial.',}),

  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas deben coincidir.',
  path: ['confirmPassword'],
});

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    password:'',
  },
});

const {watch, trigger} = form;
const router = useRouter();
const [showPassword, setShowPassword] = useState(false);

useEffect(() =>{
  const subscription = watch(()=>{
    trigger();
  });
return() => subscription.unsubscribe();
}, [watch, trigger]);

const handleSubmit = async (data: z.infer<typeof formSchema>) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          currentPassword: data.currentPassword,
          newPassword: data.password,
          confirmPassword: data.confirmPassword,
        }),
      },
    );
    if ( response.ok) {
      showToast('success', <p>Contraseña cambiada con éxito.</p>);
      router.push('/profile');
    } else{
      showToast('error', <p>Error al cambiar la constraseña.</p>);
    }
  } catch (error) {
    console.error('Error:', error);
    showToast ('error', <p>Hubo un problema durante el proceso.</p>);
  }
};

return(
  <Form{...form}>
  <form onSubmit={form.handleSubmit(handleSubmit)} className="w-[310px]">
    <FormField
    control={form.control}
    name="currentPassword"
    render={({field}) =>(
      <FormItem>
        <div className="text-red-500 relative">
          <FormControl>
            <Input
            placeholder="Contraseña actual"
            {...field}
            type={showPassword ? 'text' : 'password'}
            />
          </FormControl>
        </div>
        <FormMessage/>
      </FormItem>
    )}
    />
    <FormField
    control={form.control}
    name="password"
    render={({field}) =>(
      <FormItem>
        <div className="text-red-500 relative">
          <FormControl>
            <Input
            placeholder="Nueva contraseña"
            {...field}
            type={showPassword ? 'text' : 'password'}
            />
          </FormControl>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setShowPassword((prev)=> !prev)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible/>
            ):(
              <AiOutlineEye/>
            )}
          </div>
        </div>
        <FormMessage/>
      </FormItem>
    )}
    />
    <FormField
    control={form.control}
    name="confirmPassword"
    render={({field}) =>(
      <FormItem>
        <div className="text-red-500 relative">
          <FormControl>
            <Input
            placeholder="Repetir contraseña"
            {...field}
            type={showPassword ? 'text' : 'password'}
            />
          </FormControl>
        </div>
        <FormMessage/>
      </FormItem>
    )}
    />

    <Button type="submit" variant="submit" size="submit">
      Cambiar contraseña
    </Button>
    </form>
  </Form>
);
};

export default ChangePasswordForm