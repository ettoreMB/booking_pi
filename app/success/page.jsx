"use client"

import { Button } from "@/components/Button";
import {Player} from "@lottiefiles/react-lottie-player";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Success() {
  const animationURL = "/lootie/success.json";
  const router = useRouter()
  return (
    <div className="w-full max-w-2xl h-full flex items-center justify-center flex-col mx-auto ">
      <Player 
        src={animationURL}
        autoplay
        keepLastFrame
        speed={0.8}
        // style={{ height: '300px', width: '300px' }}
      />
      <h1>Reserva efetuada com sucesso</h1>
      
      <Link href={"/"} 
        className="
        h-10
        px-2
        text-base
        bg-optionB-main
        hover:bg-opacity-75
        rounded
        w-full
        text-white
        hover:text-white
        hover:no-underline
        visited:text-white
        font-lg
        flex
        items-center
        justify-center
        "
      >
        Voltar
      </Link>
    </div>
  )
}