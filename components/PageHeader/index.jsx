'use client'

import {  CaretLeft } from "@phosphor-icons/react";
import Link from "next/link";

export default function PageHeader({pageName}) {
  return (
    <div className="w-full h-12 bg-optionA-gray-main flex justify-between items-center text-optionB-gray-light px-10">
      <span className="text-bold">{pageName}</span>
      <Link href="/" color="#d4d4d4" weight="bold">
        <CaretLeft size={32} color="#fcfcfc" weight="bold" />
      </Link>
    </div>
  )
}