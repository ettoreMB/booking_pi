import { Suspense } from 'react'

import Loading from '../loading'
import productsService from '@/app/services/productService'
import categoriesService from '@/app/services/categorieServices'
import citiesService from '@/app/services/citiesService'
import SearchBar from '@/components/HomeComponents/SearcBar'
import CategoryList from '@/components/HomeComponents/CategoryList'
import Products from '@/components/HomeComponents/Products'

export default async function HomePage() {
  const [products, categories, cities] = await Promise.all([
    productsService.getProducts(),
    categoriesService.getCategories(),
    citiesService.getCities(),
  ])

  const hasData =
    products.length > 0 && categories.length > 0 && cities.length > 0

  return (
    <div className="w-full">
      <Suspense fallback={<Loading />}>
        <SearchBar cities={cities} />
        <CategoryList categories={categories} />
        <Products products={products} />
      </Suspense>
    </div>
  )
}
