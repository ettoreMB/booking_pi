'use client'

import Loading from "@/app/loading"
import Card from "@/components/Card"
import productsService from "@/app/services/productService"
import { useQuery } from "@tanstack/react-query"
import {   useContext, useMemo } from "react"
import { FilterContext } from "../../provider/filterProvier"


export default function Products({products}) {

const {selectedCategory, selectedCity} = useContext(FilterContext)

const {data} = useQuery({queryKey: ['products', selectedCity], queryFn:() => productsService.getProducts(selectedCity), initialData: products})
console.log("renderizou produtos")
const filteredProductsByCategory = useMemo(()=> {

  const result = data?.filter(item => item.category === selectedCategory || !selectedCategory)
  if(!result) {
    return data
  }
  return result
  },[data,selectedCategory])

  return (
    <div className="flex flex-wrap  md:flex-row  sm:justify-center md:justify-start ">
      {/* {isLoading && <Loading/>} */}
      {filteredProductsByCategory?.map( product => (
        <Card key={product.id} produto={product}/>
    ))}
    </div>
  )
}