"use client"

import { Suspense } from "react"
import {  usePathname,  useRouter } from "next/navigation"

import { Button } from "flowbite-react"
import { useQuery } from "@tanstack/react-query"

import productsService from "@/app/services/productService"
import useScreenSize from "@/hooks/useScreenSize"
import Loading from "@/app/loading"
import ProductHeader from "@/components/ProductComponents/ProductHeader"
import MobileCarrousel from "@/components/ProductComponents/MobileCarrousel"
import Gallery from "@/components/ProductComponents/Gallery"
import ProductDescription from "@/components/ProductComponents/Description"
import ProductMap from "@/components/ProductComponents/Map"
import ProductServices from "@/components/ProductComponents/ProductServices"
import Rules from "@/components/ProductComponents/Rules"
import Calendar from "@/components/Calendar"



export default function Product({params}) {
  const router = useRouter()

  const pathname = usePathname()

  const {data, isLoading} = useQuery({queryKey:["product", params.id],queryFn:() => productsService.getProductsById(params.id) })
 
  // const images =[
  //   "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  //   "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
  //   "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  //   "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  //   "https://images.unsplash.com/photo-1519690889869-e705e59f72e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  // ]


  const { width } = useScreenSize()
  return (
    <>
      {isLoading && (<Loading />)}
      {!isLoading && (<div>
      <ProductHeader product={data} showSubHeder />
      <section className="h-1/3 w-full">
        {width > 820 ? (<Gallery images={data.images} />) : (<MobileCarrousel images={data.images} />)}
      </section>

      <ProductDescription title={data.title} description={data.description} />
    
      
        <section className="px-10">
          <ProductMap address={"Rua floresta 610, itacolmi, picarras"}/>
        </section>
     
     
      <ProductServices />
      <Rules />
      <section className="py-4 px-10 w-full  h-96 flex flex-col md:flex-row items-center justify-center">
      <div className="h-full w-full md:w-1/2 flex justify-end">
        <Calendar />
      </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <Suspense fallback={<Loading />}>
            <Button filled={'true'} onClick={()=> router.push(`${pathname}/reserva`)} >Fazer reserva</Button>
          </Suspense>
      </div>
      </section>
    </div>)}
    
    </>
    
  )
}