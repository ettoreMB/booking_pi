import Loading from "@/app/loading"
import EmptyPage from "@/components/EmptyPage"
import PageHeader from "@/components/PageHeader"
import productsService from "@/app/services/productService"

import Link from "next/link"
import { Suspense } from "react"
import Image from "next/image"

export default async function MeusProdutos({params}){

  const products = await productsService.getProductsByUserId(params.id)

  const hasProducts =  products.length > 0

  return(
   <>
     <PageHeader pageName={"meus produtos"}/>
    <div className="flex px-10 gap-4 pt-10">
      <Suspense fallback={<Loading />}>
        {hasProducts && (
          <div className="shadow-lg flex gap-6 w-full bg-white p-4 rounded-lg border-[0.5px] border-slate-300 border-solid ">
            {products.map( product => (
         <div className="flex flex-col max-w-sm w-96 rounded-lg shadow-lg border-[0.3px] border-slate-300 border-solid" key={product.id}>
          <div className="h-32 w-full rounded-lg relative">
            <Image src={product.cover_image} alt="" fill className="object-cover h-full w-full rounded-lg" placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcd+LMUgAHVwLpfp1CsAAAAABJRU5ErkJggg==" />
          </div>
          <div className=" flex flex-col p-2">
            <div className="flex flex-col ">
            <span><strong>Nome:</strong>{product.name} </span>
            <span className="font-serif"><strong>Titulo:</strong> { product.title}</span>
            <span><strong>Cidade:</strong> {product.city}</span>
            <span><strong>Categoria:</strong> {product.category}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/" className="w-full flex-1 p-1.5 rounded-md bg-optionB-main hover:bg-opacity-75  text-white hover:text-white hover:no-underline flex items-center justify-center ">
                Visualizar
              </Link>
              {/* <button className="w-full flex-1 p-1.5 rounded-md bg-optionB-main text-white flex items-center justify-center">
                Editar
              </button> */}
            </div>
          </div>
       </div>
      ))}
          </div>
        )}
        {!hasProducts && (
         <EmptyPage message={"esta lista esta vazia"} />
        )}
      </Suspense>
    </div>
   </>
  )

}