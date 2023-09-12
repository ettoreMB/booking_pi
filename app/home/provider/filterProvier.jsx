'use client'
 
import { createContext, useState } from 'react'
 
export const FilterContext = createContext({})
 
export default function FilterProvider({ children }) {
  const [city, setCity]=useState('')
  const [selectedCity, setSelectedCity]=useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  function handleSelectCity (city) {
    setSelectedCity(city)
  }

  function handleSelectCategory(category) {
    setSelectedCategory(category)
  }
  function handleCity(city) {
    setCity(city)
  }


  return (
    <FilterContext.Provider value={{selectedCity, handleSelectCity, selectedCategory, handleSelectCategory, city, handleCity}}>
      {children}
    </FilterContext.Provider>
  )
   
}