


import EmptyPage from "@/components/EmptyPage"


export default async function MinhasRerservas({params}){

  // const reservations = await reservationsService.getReservationsByUserId(params.id)
  // console.log(reservations)
  
  // const hasReservations =  false
  return(
    <>

      {/* <PageHeader pageName={"minhas reservas"}/>
        <div className="flex px-10 gap-4 pt-10">
          <Suspense fallback={<Loading />}>
            {hasReservations && (
              <>
                {products.map( product => (
            <div className="flex flex-col max-w-sm  rounded-lg shadow-lg" key={product.id}>
              <div className="h-32 w-full rounded-lg">
                <Image src={product.cover_image} alt="" className="object-cover h-full w-full rounded-lg" width={200} height={200} />
              </div>
              <div className=" flex flex-col p-2">
                <div className="flex flex-col">
                Nome:{product.name} 
                <span>Titulo: {product.title}</span>
                <span>Cidade: {product.city}</span>
                <span>Categoria: {product.category}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/" className="w-full flex-1 p-1.5 rounded-md bg-optionB-main text-white flex items-center justify-center">
                    Visualizar
                  </Link>
                  <button className="w-full flex-1 p-1.5 rounded-md bg-optionB-main text-white flex items-center justify-center">
                    Editar
                  </button>
                </div>
              </div>
          </div>
          ))}
          </>
        )}
        {!hasReservations && (
          
        )}
      </Suspense>
      
     

    </div> */}
    <EmptyPage message={"estalista esta vazia"}/>
    </>
  )

}