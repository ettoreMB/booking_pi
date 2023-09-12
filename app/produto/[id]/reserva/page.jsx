'use client'


import Rules from "../../components/Rules";

import BookingForm from "./components/form";
import ProductHeader from "../../components/ProductHeader";
import { useQuery } from "@tanstack/react-query";
import productsService from "@/app/services/productService";
import Loading from "@/app/loading";


export default function Reservation({ params }) {

  const { data, isLoading } = useQuery({ queryKey: ["product", params.id], queryFn: () => productsService.getProductsById(params.id) })
  
  return (
    <>
      {isLoading && (<Loading />)}
      {!isLoading && (
        <div className="">
          <ProductHeader product={data} showSubHeder={false} />
          <div className="px-10">
            <div className="flex gap-6  h-[680px]">
              <BookingForm  product={data}/>
            </div>
            <Rules />
          </div>
        </div>
      )}
    </>


  )
}