'use client'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Client } from "@googlemaps/google-maps-services-js";
import Loading from "@/app/loading"
import citiesService from "@/app/services/citiesService"
import rulesAttributesService from "@/app/services/rulesAttributesService"
import { Button } from "@/components/Button"
import FormGroup from "@/components/Form/formGroup"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Form, useForm } from "react-hook-form";
import z from 'zod'
import { Input } from "@/components/Input";
import { TextArea } from "@/components/TextArea";
import categoriesService from "@/app/services/categorieServices";
import Image from "next/image";
import { AuthContext } from "@/app/home/provider/authProvider";


const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
// const ProductFormSchema = z.object({
//   name: z.string().nonempty({ message: "Campo deve estar preenchido" }),
//   street: z.string(),
//   number: z.string(),
//   complement: z.string(),
//   state: z.string(),
//   lat: z.number(),
//   long: z.number(),
//   city_id: z.string(),
//   zip_code: z.string(),
//   cover_image: z.string(),
//   category_id: z.string(),
//   title: z.string(),
//   description: z.string(),
// })



export default function NewProduct() {
  const { data, isLoading } = useQuery({ queryKey: ['rulesAttributes'], queryFn: () => rulesAttributesService.getRulesAttributes() })
  const { data: cities } = useQuery({ queryKey: ['cities'], queryFn: () => citiesService.getCities(), initialData: [] })
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: () => categoriesService.getCategories(), initialData: [] })

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    // resolver: zodResolver(ProductFormSchema)
  })

  const [images, setImages] = useState([])
  const [coverImageFile, setCoverImageFile] = useState();
  const [coverImage, setCoverImage] = useState();
  const [imagesFiles, setImagesFiles] = useState([])
  const [attributes, setAttributes] = useState([])
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

  const { user } = useContext(AuthContext)

  function imageHandler(e) {
    const { files } = e.target
    const validImagesFiles = []

    for (let file of files) {
      if (file.type.match(imageTypeRegex)) {
        validImagesFiles.push(file)
      }
    }

    if (validImagesFiles.length) {
      setImagesFiles(validImagesFiles)
      return
    }
    alert("Selected images are not of valid type!");
  }

  function handleChangeImage(e) {
    const image = getValues("cover_image")
    setCoverImage(URL.createObjectURL(image[0]));
    setCoverImageFile(image[0])
  }

  function handleRemoveImage(Image) {
    const newImages = images.filter((image) => image !== Image)
    setImages(newImages)
  }

  function handleAddAttribute(e) {

    if (e.target.checked) {
      const att = { id: e.target.value }
      setAttributes(prev => [...prev, att])
    } else {
      const filteredAttributes = attributes.filter(item => item.id !== e.target.value)
      setAttributes(filteredAttributes)
    }

  }

  async function handleGetCoordinates({ number, street, city, state }) {
    try {
      const cordinates = await client.geocode({
        params: {
          key: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
          address: `${number} ${street} ${city} ${state}`
        }
      })
      const result = cordinates.data.results[0]
      console.log(result.geometry)
      if (result?.geometry?.location) {
        const lat = result.geometry.location.lat
        const long = result.geometry.location.lng
        console.log(lat, long)
        setValue("lat", lat)
        setValue("long", long)
      }
    } catch (error) {
      return
    }

  }

  async function searchCEP() {
    const cep = getValues("zip_code")
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

      const filteredCity = cities.find(city => city.Name.toLocaleLowerCase('pt-BR') === data.localidade.toLocaleLowerCase('pt-BR'))

      setAddress({
        cep: data.cep ?? getValues("zip_code"),
        logradouro: data.logradouro,
        complemento: "",
        bairro: data.bairro,
        localidade: filteredCity ? {
          id: filteredCity.ID,
          name: filteredCity.Name
        } : {
          id: undefined,
          name: ""
        },
        uf: data.uf,
        ibge: data.ibge,
        gia: data.gia,
        ddd: data.ddd,
        siafi: data.siafi
      })
      setValue("street", data.logradouro ?? "")
      setValue("state", data.uf ?? "")
      setValue("complement", data.complemento ?? "")

    } catch (err) {
      console.log(err)
    }

  }

  async function handleAddDefaultText(e) {
    const target = e.target
    const ruleId = target.value.split("_")
    const rule = data.rules.find(rule => rule.id === ruleId[1])


    if (target.checked && !!rule) {
      switch (rule.title) {
        case 'politica cancelamento':
          setValue(`rules.${ruleId[0]}.text`, "A reserva deve ser cancelada até 48 horas antes");
          break
        case 'regras da casa':
          setValue(`rules.${ruleId[0]}.text`, "Não é pertmitido botar fogo na casa");
          break
        case 'saude e seguraça':
          setValue(`rules.${ruleId[0]}.text`, "proibido fumar");
          break
      }
    } else {
      setValue(`rules.${ruleId[0]}.text`, "");
    }

  }

  async function onSubmit(data) {
    const rules = []
    const images = []
    data.rules.forEach(item => {
      rules.push(item)
    })

    const bodyData = {
      user_id: "cc7c3f1c-ca13-4d8a-a042-dccf6a60419c",
      name: data.name,
      title: data.title,
      description: data.description,
      address: `${data.street} ${data.number} ${data.complement} ${data.bairro}`,
      zip_code: data.zip_code,
      cover_image_url: "",
      city_id: address.localidade.id,
      category_id: data.category,
      images: images,
      rules,
      attributes: data.attributes
    }

    

    

    try {
      const { data: urlImage } = await axios.post(`/api/imageS3?product=${data.name}&file=${coverImageFile.name}&fileType=${coverImageFile.type}`)
      console.log(urlImage)
      console.log(coverImageFile)
      const {data: s3up}= await axios.put(urlImage, coverImageFile, {
        headers: {
          "Content-Type": coverImageFile.type
        }
      })
      console.log(s3up)
      bodyData.cover_image_url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.amazonaws.com/${data.name}-${coverImageFile.name}`

      imagesFiles.forEach(async (file) => {
        const { data: urlImage } = await axios.post(`/api/imageS3?product=${data.name}&file=${file.name}&fileType=${file.type}`)
        console.log(urlImage)
        await axios.put(urlImage, file, {
          headers: {
            "Content-Type": coverImageFile.type
          }
        })
        bodyData.images.push(`https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.amazonaws.com/${data.name}-${file.name}`)

      })
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/product/create`, bodyData)
      
    } catch (error) {
      alert(error)
    }

    console.log(bodyData)
  }

  useEffect(() => {
    const filesReaders = []

    let isCancel = false

    if (imagesFiles.length) {
      const promises = imagesFiles.map(file => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader()

          filesReaders.push(fileReader);
          fileReader.onload = (e) => {
            const { result } = e.target

            if (result) {
              resolve(result)
            }
          }
          fileReader.onabort = () => {
            reject(new Error("File reading abortet"))
          }

          fileReader.onerror = () => {
            reject(new Error("Failed to read file"))
          }

          fileReader.readAsDataURL(file)
        })
      })

      Promise.all(promises).then(images => {
        if (!isCancel) {
          setImages(images)
        }
      }).catch(reason => { console.log(reason) })
    }

    return () => {
      isCancel = true
      filesReaders.forEach(fileReader => {
        if (fileReader.readyState === 1) {
          fileReader.abort()
        }
      })
    }
  }, [imagesFiles])

  const hasImages = images.length > 0

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <form className="flex flex-col px-10 pt-10 gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2>Nome</h2>
            <div className="flex gap-4">
              <FormGroup label={"Nome: "}>
                <Input type="text" name="" id="" {...register('name')} placeholder="nome" />
              </FormGroup>

              <FormGroup label={"Titulo: "}>
                <Input type="text" name="" id="" {...register('title')} placeholder="titulo" />
              </FormGroup>

              <FormGroup label={"Cateogira: "}>
                <div>
                  <select
                  {...register('category')}
                    className="
                          border-0  
                          h-10 
                          focus:outline-none 
                          ring-transparent 
                          focus:ring-0 
                          flex-1
                           rounded 
                          bg-white
                          flex 
                          gap-2 
                          w-full
                          md:max-w-md 
                          lg:max-w-3xl
                          items-center 
                          py-2 
                          px-2 
                          shadow-md"
                    id="categories"
                  >

                    {categories.map(category => (
                      <option key={category.ID} value={category.ID}>{category.Name}</option>
                    ))}
                  </select>
                </div>

              </FormGroup>

            </div>

            <FormGroup label={"Descrição: "}>
              <input type="textarea" {...register('description')} placeholder="descrição"
                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-optionB-main  focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50" />
            </FormGroup>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2>Endereço</h2>
            <div className="flex flex-col">
              <div className="flex">
                <FormGroup label={"CEP: "}>
                  <div className="flex gap-2">
                    <Input type="text"  {...register('zip_code')} placeholder="cep" />
                    <Button filled size={"md"} type="button" onClick={searchCEP}>Buscar dados</Button>
                  </div>

                </FormGroup>
              </div>
              {!!address.cep && (
                <>
                  <div className="flex">
                    <FormGroup label={"Rua"}>
                      <Input type="text" {...register("street", {
                        onChange: (e) => {
                          handleGetCoordinates({
                            number: getValues("number"),
                            city: address.localidade.name,
                            state: address.uf,
                            street: e.target.value
                          })
                        }
                      })} placeholder="Rua" />

                    </FormGroup>

                    <FormGroup label={"Numero: "}>
                      <Input type="text" {...register("number", {
                        onChange: (e) => {
                          handleGetCoordinates({
                            number: e.target.value,
                            city: address.localidade.name,
                            state: address.uf,
                            street: getValues("street")
                          })
                        }
                      })} placeholder="número" onChange={(e) => handleGetCoordinates({
                        number: e.target.value,
                        city: address.localidade.name,
                        state: address.uf,
                        street: getValues("street")
                      })} />
                    </FormGroup>

                    <FormGroup label={"Complemento: "}>
                      <Input type="text" {...register("complement")} placeholder="complemento" />
                    </FormGroup>

                    <FormGroup label={"Bairro: "}>
                      <Input type="text" {...register("bairro")} placeholder="bairro" />
                    </FormGroup>
                  </div>

                  <div className="flex">
                    <FormGroup label={"cidade"}>

                      <select id="city-select" {...register('city')}
                        className="
                          border-0  
                          h-10 
                          focus:outline-none 
                          ring-transparent 
                          focus:ring-0 
                          flex-1
                           rounded 
                          bg-white
                          flex 
                          gap-2 
                          w-full
                          md:max-w-md 
                          lg:max-w-3xl
                          items-center 
                          py-2 
                          px-2 
                          shadow-md">
                        <option value={address.localidade.id} selected={!!address.localidade.name}>{address.localidade.name ? address.localidade.name : "selecione uma cidade"}</option>
                        {cities.map(city => (
                          <option value={city.Id} key={city.Id}>{city.Name}</option>
                        ))}

                      </select>



                    </FormGroup>

                    <FormGroup label={"Estado: "}>
                      <Input type="text" {...register("state")} placeholder="Rua" />
                    </FormGroup>
                  </div>
                  <div className="flex flex-col">
                    <h3>Coordenadas</h3>
                    <div className="flex">
                      <FormGroup label={"lat: "}>
                        <Input type="text" {...register("lat")} placeholder="Rua" />
                      </FormGroup>

                      <FormGroup label={"long: "}>
                        <Input type="text" {...register("long")} placeholder="Rua" />
                      </FormGroup>

                      <Button type="button" onClick={() => handleGetCoordinates({
                        number: getValues("number"),
                        city: address.localidade.name,
                        state: address.uf,
                        street: getValues("street")

                      })}>Buscar</Button>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>


          <div className="flex flex-col bg-white shadow-lg rounded-lg p-4">
            <h2>Caracteristicas</h2>
            <div className="flex gap-4">
              {data?.attributes.map((attribute, index) => (
                <div className="flex gap-1 items-center" key={attribute.id}>
                  <input
                    id={`attribute-${index}`}
                    type="checkbox"
                    value={attribute.id}
                    {...register(`attributes.${index}.id`,
                      { value: `${attribute.id}` })}
                    onChange={(e) => handleAddAttribute(e)}
                    className="h-4 w-4 rounded-full shadow focus:ring-0"
                  />
                  <Image src={`/icons/${attribute.icon}.svg`} alt="" className="h-6 w-6" width={24} height={24} />
                  <span>{attribute.name}</span>
                </div>
              ))}
            </div>
          </div>


          <div className="flex flex-col bg-white shadow-lg rounded-lg p-4">
            <h2>Regras</h2>
            <div className="flex gap-4">
              {data?.rules.map((rule, index) => (
                <div key={rule.id}>
                  <div className="flex flex-col gap-2">
                    <span>{rule.title}</span>
                    <input type="hidden" {...register(`rules.${index}.id`, { value: `${rule.id}` })} />
                    <TextArea value={rule.text} {...register(`rules.${index}.text`)} />

                    <div className="flex gap-2 items-center">
                      <input type="checkbox" id={`rule-${index}`} value={`${index}_${rule.id}`} onClick={(e) => handleAddDefaultText(e)} className="h-4 w-4 rounded-full shadow focus:ring-0" />
                      <label htmlFor="">usar texto  padrão</label>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col bg-white shadow-lg rounded-lg p-4">
            <h2>Imagens</h2>
            <FormGroup label={"Imagem de capa"}>
              <input type="file" {...register("cover_image", { onChange: (e) => handleChangeImage(e) })} />
            </FormGroup>
            {coverImage && (
              <Image src={coverImage} className="w-20 h-20" alt="image" width={80} height={80} />
            )}

            <FormGroup label={"galeria de imagens"}>
              <input type="file" multiple onChange={imageHandler} />
            </FormGroup>

            <div className="flex gap-2">
              {images.map(image => (
                <div key={image} className="w-20 h-20" onClick={() => handleRemoveImage(image)}   >
                  <Image src={image} className="w-full h-full" alt="image" width={80} height={80} />
                </div>
              ))}
            </div>
          </div>
          <Button filled type="submit">enviar</Button>
        </form>
      )}
    </>
  )
}