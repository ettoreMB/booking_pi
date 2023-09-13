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

  console.log("renderizou Home ")
  const hasData = !!products && !!categories && !!cities
  return (
    <main className="h-full w-full">
      <Suspense fallback={<Loading />}>
        {hasData && (
          <>
            <SearchBar cities={cities} />
          <div className="px-10  py-10 ">
            <CategoryList categories={categories} />
            <Products products={products} />
          </div>
          </>
        )}
        {!hasData && (<h1>erro ao carregar a pagina</h1>)}
      </Suspense>
    </main>
  )
}