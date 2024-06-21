"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "@/app/components/ui/input"



const formSchema = z.object({
    username: z.string()
      .min(5, { message: "El usuario debe tener por lo menos 5 caracteres." })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "El usuario solo puede contener letras, números y guiones bajos." }),
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
      username: "",
      password: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="usuario" {...field} />
              </FormControl>
              <FormDescription>
                Este es tu nombre de usuario.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="contraseña" {...field} type="password"/>
              </FormControl>
              <FormDescription>
                Esta es tu contraseña.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
