`use client`

import Badge from "@/components/Badge";
import Rating from "@/components/Rating";
import { useRouter } from "next/navigation";


export default function ProductHeader({product, showSubHeder = true}) {
 
  const router = useRouter()
  return(
    <header>
    <div 
    className="w-full px-10 py-2 bg-optionB-gray-main  flex justify-between text-optionB-gray-light items-center mb-0">
      <div className="flex flex-col">
        <span className="text-sm font-light">{product.category}</span>
        <span className="text-2xl font-bold ">{product.name}</span>
      </div>
      <div className="cursor-pointer" onClick={()=> router.back('') } >
        <img src="/icons/backButton.svg" alt="" className="h-8"  />
      </div>
    </div>

    {showSubHeder && (
       <div className="px-10 py-1 bg-optionB-gray-light flex   justify-between items-start md:items-center">
       <div className="flex flex-col  items-start text-optionB-gray-dark font-semibold text-sm">
        <div className="flex items-center gap-2">
          <img src="/icons/location.svg" alt="" className="h-4" />
          <span>{product.city}, {product.address}</span>
        </div>
         
         <div>
           <span className="font-light text-sm">940 m para o centro</span>
         </div>

       </div>
       <div className="flex items-center gap-2">
         <div className="">
           <span className="font-semibold text-sm">Muito bom</span>
           <Rating />
         </div>
         <Badge number={8}/>
       </div>
     </div>
    )}
  </header>
  )
  
}