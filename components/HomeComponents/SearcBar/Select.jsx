import { useContext } from "react"

import Image from "next/image"
import { FilterContext } from "@/app/home/provider/filterProvier"


export default  function Select({cities}) {
  
  const { handleCity, city } = useContext(FilterContext)
  return (
    <div
      className={`
      h-10 
      rounded 
      bg-white
      flex 
      gap-2 
      w-full
      md:max-w-md 
      lg:max-w-lg
      items-center
      px-2 
      shadow-md
      object-contain
    `}
    >
      <Image src='/icons/location.svg' alt="icon" className="h-6" height={24} width={24}  />
      <select
        className={`
        border-0 h-full focus:outline-none ring-transparent focus:ring-0 flex-1
        `}
        placeholder="Para onde Vamos ?"
        value={city}
        onChange={(e) => handleCity(e.target.value)}
      >
        <option value="">Para onde vamos ?</option>
        {cities.map(city => (
          <option key={city.ID} value={city.ID}>{city.Name}</option>
        ))}
      </select>
    </div>
  )
}