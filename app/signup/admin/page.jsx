"use client"


import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import Link from "next/link";
import { toastError } from "@/utils/toasts";
import { useRouter } from "next/navigation";
import FormGroup from "@/components/Form/formGroup";
import { Input } from "@/components/Input";

import { useForm } from "react-hook-form";
import { Button } from "@/components/Button";

import { ToastContainer } from "react-toastify";
import axios, { isAxiosError } from "axios";
import { isAbortError } from "next/dist/server/pipe-readable";

const loginFormSchema = z.object({
  name: z.string().nonempty({ message: "Campo deve estar preenchido" }),
  lastName: z.string().nonempty({ message: "Campo deve estar preenchido" }),
  email: z.string().email({ message: "deve ser um email valido" }),
  password: z.string().nonempty({ message: "Campo deve ser preenchido" }),
  repeatPassword: z.string().nonempty({ message: "Campo deve ser preenchido" }),
}).refine((data) => data.password === data.repeatPassword, {
  message: "As senhas devem ser iguais",
  path: ['repeatPassword']
})

export default function AdminSignup() {

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginFormSchema)
  })


  async function onSubmit(data) {
   try {
    await axios.post('http://localhost:5000/user/create', {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password
   })
    router.push("/login")
   } catch (error) {
    console.log(error)
    if (isAxiosError(error)) {
      toastError(error.response.data.message)
    }
   }
  }
  
  return (
    <div className="mx-auto w-full  flex flex-col justify-center h-full ">
      <h1
        className="text-center text-2xl text-optionB-main font-bold mb-2">
        Criar Conta Admin
      </h1>
      <form
        className="mx-auto  flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      > 
        <div className="flex gap-3">
        <FormGroup label={"Nome"}>
          <Input type='text' {...register('name')} error={errors?.name?.message} />
        </FormGroup>
        <FormGroup label={"Sobrenome"}>
          <Input type='text' {...register('lastName')} error={errors?.lastName?.message} />
        </FormGroup>
        </div>
        

        <FormGroup label={"E-mail"}>
          <Input type='text' {...register('email')} error={errors?.email?.message} />
        </FormGroup>

        <FormGroup label={"Senha"}>
          <Input type="password" {...register('password')} error={errors?.password?.message} />
        </FormGroup>

        <FormGroup label={"Senha"}>
          <Input type="password" {...register('repeatPassword')} error={errors?.repeatPassword?.message} />
        </FormGroup>
        <Button filled type="submit" >Criar Conta</Button>

        <div className="text-base text-center">Já tem uma conta? <Link className="text-blue-500" href='/login'>Iniciar sessão</Link></div>
      </form>
      <ToastContainer />
    </div>
  )
}