"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

 const formSchema = z.object({
    email: z.string()
      .email({ message: "Debe ser un correo electrónico válido." }),
    password: z.string()
      .min(8, { message: "La contraseña debe tener por lo menos 8 caracteres." })
      .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula." })
      .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula." })
      .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
      .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial." }),
  })
  

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const router = useRouter()

  function onRegister() {
    router.push('/register') 
  }


  return (
    <div className="flex flex-col bg-red-500 w-full h-full items-center justify-center min-h-screen bg-red-00 p-4 lg:h-full lg:w-full">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} className="w-full p-2 border border-gray-300 rounded" />
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
                    <Input placeholder="*********" {...field} type="password" className="w-full p-2 border border-gray-300 rounded" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">Enviar</Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <p className="text-black">
            ¿Aún no estás registrado?
            <Button onClick={onRegister} type="button" className="ml-2 bg-white hover:bg-gray-200 text-red-600 py-2 rounded">Registrarme</Button>
          </p>
        </div>
      </div>
    </div>
  )
}