
import { Suspense } from "react";
import CategoryList from "./components/CategoryList";
import Products from "./components/Products";
import SearchBar from "./components/SearcBar";
import Loading from "../loading";
import productsService from "@/app/services/productService";
import categoriesService from "@/app/services/categorieServices";
import citiesService from "@/app/services/citiesService";

export default async function HomePage() {

  const [products, categories, cities] = await  Promise.all([productsService.getProducts(), categoriesService.getCategories(), citiesService.getCities()])
  console.log("renderizou Home ")
  return (
    <main className="h-full w-full">
      <Suspense fallback={<Loading />}>
        <SearchBar cities={cities} />
        <div className="px-10  py-10 ">
          <CategoryList categories={categories} />
          <Products products={products} />
        </div>
      </Suspense>
    </main>
  )
}