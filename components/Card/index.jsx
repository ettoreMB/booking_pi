'use client'

import { Button } from "../Button";
import Link from "next/link";
import Badge from "../Badge";
import { Suspense } from "react";
import Loading from "@/app/loading";
import Image from "next/image";


export default function Card({ produto }) {

  function textIsBiggerThanLimit(text) {
    if (text.length > 150) true
  }

  const text = "No coração de San Telmo, desfrute de uma pousada inspirada nas paixões de Buenos Aires. com 2 piscinas impressionantes, uma no terraço e outra ao ar livre; quartos privados alguns ... ms..."
  const textPreview = text.substring(0, 150)

  return (
    <div className=" h-[500px] md:h-72 w-full lg:w-1/2 2xl:w-1/3 min-w-[200px] p-1">
      <div className="shadow-md lg:shadow-2xl self-center rounded-md bg-white flex flex-col md:flex-row h-full w-full ">
        <div className="h-1/2 md:h-full w-full md:w-1/2 object-contain relative">
          <Image
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcd+LMUgAHVwLpfp1CsAAAAABJRU5ErkJggg=="
          fill
            className="object-cover h-full w-full rounded-md"
            src={produto.cover_image} alt="hotel image"
          />
        </div>
        <div className="h-1/2 md:h-full flex flex-col p-3 w-full md:w-1/2">
          <div className="flex justify-between mb-4">
            <div className="flex flex-col">
              <div className="flex text-sm text-slate-500 font-bold gap-2"><span>HOTEL</span><span className="">starts</span></div>
              <h2 className="text-2xl font-bold text-optionB-gray-dark">{produto.name}</h2>
            </div>
            <div className="font-bold flex flex-col items-end">
              <Badge number={8} />
              <span className="">Muito bom</span>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-start text-sm gap-1">
            <Image src="./icons/location.svg" alt="" className="h-4" height={16} width={16} />
            <span>A {produto.distance_center} m do centro - </span>
            <Link href={`/`} className="uppercase text-optionB-main text-end" >MOSTRAR NO MAPA</Link>
          </div>
          <div className="break-all mb-4 h-9 flex flex-1 flex-col">
            <p className="break-all overflow-hidden ">{textIsBiggerThanLimit ? textPreview : text}</p>
            {textIsBiggerThanLimit && (<Link href={`/produto/${produto.id}`} className="text-blue-400">...ler mais</Link>)}
          </div>
          <Suspense fallback={<Loading/>}>
            <Link 
              className="h-10
              px-2
              text-base
              bg-optionB-main border-0 text-gray-100
              hover:bg-opacity-75
              rounded
              justify-center
              flex
              items-center
              " 
              href={`/produto/${produto.id}`}>Ver mais</Link>
          </Suspense>
          
        </div>
      </div>
    </div>
  )
}