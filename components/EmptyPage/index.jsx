'use client'

import { SmileySad } from "@phosphor-icons/react";
import Link from "next/link";

export default function EmptyPage({message}) {
  return (
    <div className="w-full h-[calc(100vh-15rem)] flex justify-center">
        <div className="flex flex-col">
            <div className="flex items-center gap-6">
              <SmileySad size={42} color="#545776" weight="bold" />
              <span className="text-2xl"> {message}</span>
            </div>
            <Link  className="h-10
              px-2
              text-base
              bg-optionB-main border-0 text-gray-100
              hover:bg-opacity-75
              rounded
              justify-center
              flex
              items-center
              "   href={"/"}>Voltar para Home</Link>
        </div>

    </div>
  )
}