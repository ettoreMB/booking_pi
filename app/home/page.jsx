import { Suspense } from "react";



import Loading from "../loading";
import productsService from "@/app/services/productService";
import categoriesService from "@/app/services/categorieServices";
import citiesService from "@/app/services/citiesService";
import SearchBar from "@/components/HomeComponents/SearcBar";
import CategoryList from "@/components/HomeComponents/CategoryList";
import Products from "@/components/HomeComponents/Products";

export default async function HomePage() {

  const [products, categories, cities] = await Promise.all([productsService.getProducts(), categoriesService.getCategories(), citiesService.getCities()])

  console.log(cities)

  const hasData = products.length >0 && categories.length > 0 && cities.length > 0
  
  return (
    <main className="h-full w-full">
      <Suspense fallback={<Loading />}>
     
      <span>{hasData}</span>
            <SearchBar cities={cities} />
          <div className="px-10  py-10 ">
            <CategoryList categories={categories} />
            <Products products={products} />
          </div>
        
      </Suspense>
    </main>
  )
}