"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/app/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  address: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres." }),
  email: z.string().email({ message: "Debe ser un correo electrónico válido." }),
  password: z.string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula." })
    .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula." })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
    .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial." }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas deben coincidir.",
  path: ["confirmPassword"], // set the path of the error
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  const router = useRouter()

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  function onLogin() {
    router.push('/login')
  }


  return (
    <div className=" w-full h-full flex flex-col items-center justify-center min-h-screen bg-red-500 p-4 lg:h-full lg:w-full">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Laura Diaz" {...field} />
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
                  <FormLabel className="text-black">Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Calle Falsa 123" {...field} />
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
                  <FormLabel className="text-black">Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
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
                  <FormLabel className="text-black">Contraseña</FormLabel>
                  <FormControl>
                    <Input placeholder="*********" {...field} type="password" />
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
                  <FormLabel className="text-black">Confirmar contraseña</FormLabel>
                  <FormControl>
                    <Input placeholder="*********" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">Registrarse</Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <p className="text-black">
            ¿Ya tienes una cuenta?
            <Button onClick={onLogin} type="button" className="ml-2 bg-white hover:bg-gray-200 text-red-600 py-2 rounded">Iniciar Sesión</Button>
          </p>
        </div>
      </div>
    </div>
  )
}