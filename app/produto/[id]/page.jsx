'use client'

import { Suspense, useContext } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'

import productsService from '@/app/services/productService'
import useScreenSize from '@/hooks/useScreenSize'
import Loading from '@/app/loading'
import ProductHeader from '@/components/ProductComponents/ProductHeader'
import MobileCarrousel from '@/components/ProductComponents/MobileCarrousel'
import Gallery from '@/components/ProductComponents/Gallery'
import ProductDescription from '@/components/ProductComponents/Description'
import ProductMap from '@/components/ProductComponents/Map'
import ProductServices from '@/components/ProductComponents/ProductServices'
import Rules from '@/components/ProductComponents/Rules'
import Calendar from '@/components/Calendar'
import { AuthContext } from '@/app/home/provider/authProvider'

export default function Product({ params }) {
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const pathname = usePathname()

  const { data, isLoading } = useQuery({
    queryKey: ['product', params.id],
    queryFn: () => productsService.getProductsById(params.id),
  })

  function handleISloogedIn() {
    if (user.id) {
      return router.push(`${pathname}/reserva`)
    } else {
      return router.push('/login')
    }
  }
  const { width } = useScreenSize()
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="pt-2">
          <ProductHeader product={data} showSubHeder />
          <section className="h-2/6 w-full">
            {width > 820 ? (
              <Gallery images={data.images} />
            ) : (
              <MobileCarrousel images={data.images} />
            )}
          </section>

          <ProductDescription
            title={data.title}
            description={data.description}
          />

          <section className="px-10">
            <ProductMap address={'Rua floresta 610, itacolmi, picarras'} />
          </section>

          <ProductServices />
          <Rules />
          <section className="py-4 px-10 w-full  h-96 flex flex-col md:flex-row items-center justify-center">
            <div className="h-full w-full md:w-1/2 flex justify-end">
              <Calendar />
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <Suspense fallback={<Loading />}>
                <Button filled={'true'} onClick={() => handleISloogedIn}>
                  Fazer reserva
                </Button>
              </Suspense>
            </div>
          </section>
        </div>
      )}
    </>
  )
}
