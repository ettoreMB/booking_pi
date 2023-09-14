'use client'


import BookingForm from "./components/form";

import { useQuery } from "@tanstack/react-query";
import productsService from "@/app/services/productService";
import Loading from "@/app/loading";
import ProductHeader from "@/components/ProductComponents/ProductHeader";
import Rules from "@/components/ProductComponents/Rules";
import { useContext } from "react";
import { AuthContext } from "@/app/home/provider/authProvider";


export default function Reservation({ params }) {

  const { data, isLoading } = useQuery({ queryKey: ["product", params.id], queryFn: () => productsService.getProductsById(params.id) })
  const {user}  =useContext(AuthContext)
  return (
    <>
      {isLoading && (<Loading />)}
      {!isLoading && (
        <div className="">
          <ProductHeader product={data} showSubHeder={false} />
          <div className="px-0 md:px-10">
           
              <BookingForm  product={data} userId={user.id}/>
           
            <Rules />
          </div>
        </div>
      )}
    </>


  )
}