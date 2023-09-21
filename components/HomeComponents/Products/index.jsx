'use client'

import Card from '@/components/Card'
import productsService from '@/app/services/productService'
import { useQuery } from '@tanstack/react-query'
import { useContext, useMemo } from 'react'
import { FilterContext } from '@/app/home/provider/filterProvier'

export default function Products({ products }) {
  const { selectedCategory, selectedCity } = useContext(FilterContext)

  const { data } = useQuery({
    queryKey: ['products', selectedCity],
    queryFn: () => productsService.getProducts(selectedCity),
    initialData: products,
  })

  const filteredProductsByCategory = useMemo(() => {
    const result = data?.filter(
      (item) => item.category === selectedCategory || !selectedCategory,
    )
    if (!result) {
      return data
    }
    return result
  }, [data, selectedCategory])

  return (
    <div className="w-full sm:justify-center md:justify-start grid grid-cols-1 md:grid-cols-2  2xl:grid-cols-3 px-2 md:px-10">
      {/* {isLoading && <Loading/>} */}
      {filteredProductsByCategory?.map((product) => (
        <Card key={product.id} produto={product} />
      ))}
    </div>
  )
}
