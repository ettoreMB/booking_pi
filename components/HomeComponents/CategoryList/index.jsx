'use client'

import CategoryCard from "@/components/CategoryCard"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { FilterContext } from "../../../app/home/provider/filterProvier"
import categoriesService from "@/app/services/categorieServices"

export default function CategoryList({ categories }) {
  
  const { data } = useQuery({ queryKey: ['categories'], queryFn:()=> categoriesService.getCategories(), initialData: categories })
console.log('renderizou categorias')
  const { handleSelectCategory } = useContext(FilterContext)
  return (

    <section className="mb-4">
      <h2 className="text-2xl text-optionB-gray-main font-bold mb-2 w-full">Buscar por tipo de acomodação</h2>
      <div className="flex flex-row  flex-wrap gap-4">
        {data.map((category, index) => (
          <div key={category.ID} onClick={() => handleSelectCategory(category.Name)} >
            <CategoryCard name={category.Name} image={category.ImageUrl} icon={category.IconName} />
          </div>
        ))}
      </div>
    </section>

  )
}