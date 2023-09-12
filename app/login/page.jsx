"use client"

import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react";
import { AuthContext } from "../home/provider/authProvider";
import { Button } from "@/components/Button";
import { isAxiosError } from "axios";

import { ToastContainer, toast } from "react-toastify";
import { toastError } from "@/utils/toasts";
const loginFormSchema = z.object({
  email: z.string().email({ message: 'Email Invalido' }).nonempty({ message: "Campo deve estar preenchido" }),
  password: z.string().nonempty({ message: "Campo deve ser preenchido" })
})

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginFormSchema)
  })

  const { signIn } = useContext(AuthContext)

  async function onSubmit(data) {
   
    try {
      await signIn({ email: data.email, password: data.password })
      toast('success', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response.status === 401) {
          toastError('Email ou senha inválidos')
          return
        }
        toastError('Erro ao realizar login, Por favor tente mais tarde')

        return
      }
      toastError('Erro ao realizar login, Por favor tente mais tarde')
      return
    }
  }
  return (
    <>
      <div className="mx-auto w-100  flex flex-col justify-center h-full ">
        <h1
          className="text-center text-2xl text-optionB-main font-bold">
          Iniciar sessão
        </h1>
        <form
          className="w-96 mx-auto flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <span className="text-sm font-medium mb-1">E-mail</span>
            <Input type='text' {...register('email')} error={errors?.email?.message} />
          </div>
          <div className="text-sm font-medium">
            <span>Senha</span>
            <Input type="password" {...register('password')} error={errors?.password?.message} />
          </div>
          <Button filled type="submit">Entrar</Button>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}