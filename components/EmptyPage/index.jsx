'use client'

import { SmileySad } from "@phosphor-icons/react";

export default function EmptyPage({message}) {
  return (
    <div className="w-full h-[calc(100vh-15rem)] flex justify-center">
            <div className="flex items-center gap-6">
              <SmileySad size={42} color="#545776" weight="bold" />
              <span className="text-2xl"> {message}</span>
            </div>
          </div>
  )
}