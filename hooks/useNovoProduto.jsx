import categoriesService from "@/app/services/categorieServices"
import citiesService from "@/app/services/citiesService"
import rulesAttributesService from "@/app/services/rulesAttributesService"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export function useNovoProduto() {
  const { data: rules, isLoading: isLoadingRules } = useQuery({ queryKey: ['rulesAttributes'], queryFn: () => rulesAttributesService.getRulesAttributes(),  })
  const { data: cities, isLoading: isLoadingCities } = useQuery({ queryKey: ['cities'], queryFn: () => citiesService.getCities(), initialData: [] })
  const { data: categories, isLoading: isLoadingCategories } = useQuery({ queryKey: ['categories'], queryFn: () => categoriesService.getCategories(), initialData: [] })


  const [images, setImages] = useState([])
  const [coverImageFile, setCoverImageFile] = useState();
  const [coverImage, setCoverImage] = useState();
  const [imagesFiles, setImagesFiles] = useState([])
  const [attributes, setAttributes] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [address, setAddress] = useState(
    {
      cep: "",
      logradouro: "",
      complemento: "",
      bairro: "",
      localidade: {
        id: null,
        name: ""
      },
      uf: "",
      ibge: "",
      gia: "",
      ddd: "",
      siafi: ""
    }
  )

  const isLoadingData = isLoadingCategories && isLoadingCities && isLoadingRules

  function handleAddAttribute(checked, value) {
    
    if (checked) {
      const att = { id: value }
      setAttributes(prev => [...prev, att])
    } else {
      const filteredAttributes = attributes.filter(item => item.id !== value)
      setAttributes(filteredAttributes)
    }

  }
  
  function handleModal(value) {
    setIsOpen(value)
  }
  


  return {
    rules,
    cities,
    categories,
    isLoadingData,
    address,
    attributes,
    imagesFiles,
    coverImage,
    coverImageFile,
    images,
    isOpen,
    setAddress,
    setAttributes,
    handleAddAttribute,
    setImages,
    setCoverImageFile,
    setCoverImage,
    setImagesFiles,
    handleModal
  }

}