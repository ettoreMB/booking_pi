'use client'

import { AuthContext } from "@/app/home/provider/authProvider";
import { GearSix, Plus } from "@phosphor-icons/react";
import Link from "next/link";
import { useContext } from "react";

export default function AdminPage() {

  const {user} =useContext(AuthContext)

  return (
    <div className="px-10  pt-10 flex flex-col w-1/2 h-[calc(100vh -50vh)] justify-center items-center gap-6">
      <Link href={"/produto/novo-produto"} className="w-64">
        <button className="flex items-center justify-start font-semibold text-lg gap-2" ><Plus size={32} weight="bold"/> Adicionar novo produto</button>
      </Link>
      <Link href={`/user/meus-produtos/${user.id}`} className="w-64">
        <button  className="flex items-center justify-start font-semibold text-lg gap-2"><GearSix size={32} color="#545776" weight="fill" /> Ver meus produtos</button>
      </Link>
    </div>
  )
}