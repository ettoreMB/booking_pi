'use client'

import { Input } from "@/components/Input"
import Select from "./Select"
import { Button } from "@/components/Button"
import useScreenSize from "@/hooks/useScreenSize"
import { useContext } from "react"

import { useQuery } from "@tanstack/react-query"

import citiesService from "@/app/services/citiesService"
import { FilterContext } from "@/app/home/provider/filterProvier"


export default function SearchBar({cities}){

  const {width} = useScreenSize()
  
  const {handleSelectCity, city}= useContext(FilterContext)
  const { data,  isLoading  } = useQuery({ queryKey: ["citites"], queryFn:() => citiesService.getCities(), initialData:cities })

  return (
        <div className="h-auto md:h-40 w-full px-2 bg-optionB-gray-dark  flex flex-col p-1 md:px-16   justify-evenly">
        {/* {isLoading && (<Loading/>)} */}
      
        <div className="mx-auto flex items-center">
          <h1
            className="text-white text-center text-3xl font-bold"
          >
            Buscar ofertas em hotéis, casas e muito mais
          </h1>
        </div>
        <div className="gap-4 flex flex-col md:flex-row  w-full justify-center">
          <Select cities={data}/>
          <Input icon="/icons/calendar.svg" placeholder='Check in - Check out'/>
          <Button filled  size={width > 765 ? 'lg' : 'full'} onClick={()=>handleSelectCity(city) }>Pesquisar</Button>
        </div>
       
      
      </div>
  )
}