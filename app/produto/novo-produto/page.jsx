'use client'
import { Dialog } from '@headlessui/react'
import { Client } from '@googlemaps/google-maps-services-js'
import Loading from '@/app/loading'
import { Button } from '@/components/Button'
import FormGroup from '@/components/Form/formGroup'
import { zodResolver } from '@hookform/resolvers/zod'

import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Input } from '@/components/Input'
import { TextArea } from '@/components/TextArea'

import Image from 'next/image'
import { useNovoProduto } from '@/hooks/useNovoProduto'
import { AuthContext } from '@/app/home/provider/authProvider'
import { toastError } from '@/utils/toasts'
import { ToastContainer } from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Divider } from '@mui/material'

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm
const ProductFormSchema = z.object({
  name: z.string().nonempty({ message: 'Campo deve estar preenchido' }),
  title: z.string().nonempty({ message: 'Campo deve estar preenchido' }),
  category: z.string().nonempty({ message: 'Campo deve estar preenchido' }),
  description: z.string().nonempty({ message: 'Campo deve estar preenchido' }),
  zip_code: z.string(),
  street: z.string().nonempty({ message: 'Campo deve estar preenchido' }),
  number: z.string().nonempty({ message: 'Campo deve estar preenchido' }),
  state: z.string(),
  complement: z.string().nullable(),
  lat: z.number(),
  long: z.number(),
  rules: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
})

const googleClient = new Client({})

export default function NewProduct() {
  const {
    rules,
    cities,
    categories,
    isLoadingData,
    address,
    attributes,
    setAddress,
    setAttributes,
    handleAddAttribute,
    coverImage,
    coverImageFile,
    images,
    imagesFiles,
    isOpen,
    bodyData,
    setIsOpen,
    setBodyData,
    setCoverImage,
    setCoverImageFile,
    setImages,
    setImagesFiles,
    handleModal,
  } = useNovoProduto()

  const { user } = useContext(AuthContext)
  const {
    register,
    handleSubmit,

    setValue,
    getValues,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ProductFormSchema),
  })

  const router = useRouter()
  async function searchCEP() {
    const cep = getValues('zip_code')
    try {
      const { data } = await axios.get(`https:viacep.com.br/ws/${cep}/json/`)

      const filteredCity = cities.find(
        (city) =>
          city.Name.toLocaleLowerCase('pt-BR') ===
          data.localidade.toLocaleLowerCase('pt-BR'),
      )

      setAddress({
        cep: data.cep ?? getValues('zip_code'),
        logradouro: data.logradouro,
        complemento: '',
        bairro: data.bairro,
        localidade: filteredCity
          ? {
              id: filteredCity.ID,
              name: filteredCity.Name,
            }
          : {
              id: undefined,
              name: '',
            },
        uf: data.uf,
        ibge: data.ibge,
        gia: data.gia,
        ddd: data.ddd,
        siafi: data.siafi,
      })
      setValue('street', data.logradouro ?? '')
      setValue('state', data.uf ?? '')
      setValue('complement', data.complemento ?? '')
    } catch (err) {
      console.log(err)
    }
  }

  async function handleGetCoordinates({ number, street, city, state }) {
    try {
      const cordinates = await googleClient.geocode({
        params: {
          key: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
          address: `${number} ${street} ${city} ${state}`,
        },
      })
      const result = cordinates.data.results[0]
      console.log(result.geometry)
      if (result?.geometry?.location) {
        const lat = result.geometry.location.lat
        const long = result.geometry.location.lng
        setValue('lat', lat)
        setValue('long', long)
      }
    } catch (error) {}
  }

  function imageHandler(e) {
    const { files } = e.target
    const validImagesFiles = []

    for (const file of files) {
      if (file.type.match(imageTypeRegex)) {
        validImagesFiles.push(file)
      }
    }

    if (validImagesFiles.length) {
      setImagesFiles(validImagesFiles)
      return
    }
    toastError('imagem inválida')
  }

  function handleChangeImage() {
    const image = getValues('cover_image')
    setCoverImage(URL.createObjectURL(image[0]))
    setCoverImageFile(image[0])
  }

  function handleRemoveImage(Image) {
    const newImages = images.filter((image) => image !== Image)
    setImages(newImages)
  }

  async function handleAddDefaultText(e) {
    const target = e.target
    const ruleId = target.value.split('_')
    const rule = rules.rules.find((rule) => rule.id === ruleId[1])

    if (target.checked && !!rule) {
      switch (rule.title) {
        case 'politica cancelamento':
          setValue(
            `rules.${ruleId[0]}.text`,
            'A reserva deve ser cancelada até 48 horas antes',
          )
          break
        case 'regras da casa':
          setValue(
            `rules.${ruleId[0]}.text`,
            'Não é pertmitido botar fogo na casa',
          )
          break
        case 'saude e seguraça':
          setValue(`rules.${ruleId[0]}.text`, 'proibido fumar')
          break
      }
    } else {
      setValue(`rules.${ruleId[0]}.text`, '')
    }
  }

  async function onSubmit(data) {
    const productImages = []
    let coverImageURL = ''

    if (imagesFiles.length < 5) {
      toastError('deve ter ao menos 5 imagens')
      return
    }

    try {
      const { data: urlImage } = await axios.post(
        `/api/imageS3?product=${data.name}&file=${coverImageFile.name}&fileType=${coverImageFile.type}`,
      )

      await axios.put(urlImage, coverImageFile, {
        headers: {
          'Content-Type': coverImageFile.type,
        },
      })

      coverImageURL = `https:${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.amazonaws.com/${data.name}-${coverImageFile.name}`
    } catch (error) {
      console.log(error)
      toastError(error)
    }

    try {
      imagesFiles.forEach(async (file) => {
        const { data: urlImage } = await axios.post(
          `/api/imageS3?product=${data.name}&file=${file.name}&fileType=${file.type}`,
        )

        await axios.put(urlImage, file, {
          headers: {
            'Content-Type': coverImageFile.type,
          },
        })
        productImages.push(
          `https:${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.amazonaws.com/${data.name}-${file.name}`,
        )
      })
    } catch (error) {
      console.log(error)
      toastError(error)
    }

    const body = {
      user_id: user.id,
      name: data.name,
      title: data.title,
      description: data.description,
      address: `${data.street} ${data.number} ${data.complement} ${
        data.bairro ? data.bairro : ''
      }`,
      zip_code: data.zip_code,
      cover_image_url: coverImageURL,
      city_id: address.localidade.id,
      category_id: data.category,
      images: productImages,
      rules,
      attributes,
    }
    console.log(body)

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/create`,
        body,
      )

      handleModal(true)
    } catch (error) {
      toastError('Erro ao criar produto')
    }
  }

  useEffect(() => {
    const filesReaders = []

    let isCancel = false

    if (imagesFiles.length) {
      const promises = imagesFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader()

          filesReaders.push(fileReader)
          fileReader.onload = (e) => {
            const { result } = e.target

            if (result) {
              resolve(result)
            }
          }
          fileReader.onabort = () => {
            reject(new Error('File reading abortet'))
          }

          fileReader.onerror = () => {
            reject(new Error('Failed to read file'))
          }

          fileReader.readAsDataURL(file)
        })
      })

      Promise.all(promises)
        .then((images) => {
          if (!isCancel) {
            setImages(images)
          }
        })
        .catch((reason) => {
          console.log(reason)
        })
    }

    return () => {
      isCancel = true
      filesReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort()
        }
      })
    }
  }, [imagesFiles, setImages])
  console.log(errors)

  return (
    <>
      {isLoadingData && <Loading />}
      {!isLoadingData && (
        <form
          className="flex w-full  flex-wrap px-10 pt-10 gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-wrap gap-4">
            {/* Nome */}
            <div className="bg-white shadow-lg  flex-1  min-w-[400px]  rounded-lg p-4">
              <h2>Nome</h2>
              <div className="flex flex-wrap gap-4">
                <FormGroup label={'Nome: '}>
                  <Input
                    type="text"
                    name=""
                    id=""
                    {...register('name', { required: true })}
                    placeholder="nome"
                    error={errors?.name?.message}
                  />
                </FormGroup>

                <FormGroup label={'Titulo: '}>
                  <Input
                    type="text"
                    name=""
                    id=""
                    {...register('title')}
                    placeholder="titulo"
                    error={errors?.title?.message}
                  />
                </FormGroup>

                <FormGroup label={'Cateogira: '}>
                  <div>
                    <select
                      required
                      {...register('category')}
                      className=" border-0   h-10  focus:outline-none  ring-transparent   focus:ring-0  flex-1  rounded  bg-white  flex   gap-2   w-full  md:max-w-md   lg:max-w-3xl  items-center   py-2   px-2   shadow-md"
                      id="categories"
                    >
                      <option value="">Selecione uma categoria</option>
                      {categories?.map((category) => (
                        <option key={category.ID} value={category.ID}>
                          {category.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                </FormGroup>
              </div>

              <FormGroup label={'Descrição: '}>
                <div className="flex flex-1 h-full w-full">
                  <textarea
                    {...register('description')}
                    required
                    placeholder="descrição"
                    className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-optionB-main  focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                  />
                </div>
              </FormGroup>
            </div>

            {/* Endereco */}
            <div className="bg-white flex-wrap shadow-lg  flex-1  min-w-[400px]    rounded-lg p-4">
              <h2>Endereço</h2>
              <div className="flex-col">
                <div className=" flex flex-wrap items-center w-full gap-2 md:gap-4 mb-4">
                  <FormGroup label={'CEP: '}>
                    <Input
                      type="text"
                      {...register('zip_code')}
                      placeholder="cep"
                      error={errors?.zip_code?.message}
                    />
                  </FormGroup>

                  <div className="pt-0 md:pt-2">
                    <Button
                      filled
                      size={'md'}
                      type="button"
                      onClick={searchCEP}
                    >
                      Buscar dados
                    </Button>
                  </div>
                </div>

                {!!address.cep && (
                  <>
                    <div className="flex flex-wrap">
                      <FormGroup label={'Rua'}>
                        <Input
                          type="text"
                          error={errors?.street?.message}
                          {...register('street', {
                            onChange: (e) => {
                              handleGetCoordinates({
                                number: getValues('number'),
                                city: address.localidade.name,
                                state: address.uf,
                                street: e.target.value,
                              })
                            },
                          })}
                          placeholder="Rua"
                        />
                      </FormGroup>

                      <FormGroup label={'Numero: '}>
                        <Input
                          type="text"
                          placeholder="número"
                          error={errors?.number?.message}
                          {...register('number', {
                            onChange: (e) => {
                              handleGetCoordinates({
                                number: e.target.value,
                                city: address.localidade.name,
                                state: address.uf,
                                street: getValues('street'),
                              })
                            },
                          })}
                        />
                      </FormGroup>

                      <FormGroup label={'Complemento: '}>
                        <Input
                          type="text"
                          {...register('complement')}
                          placeholder="complemento"
                        />
                      </FormGroup>

                      <FormGroup label={'Bairro: '}>
                        <Input
                          type="text"
                          {...register('bairro')}
                          placeholder="bairro"
                        />
                      </FormGroup>
                    </div>

                    <div className="flex flex-wrap">
                      <FormGroup label={'cidade'}>
                        <select
                          id="city-select"
                          {...register('city')}
                          className=" border-0 h-10 focus:outline-none ring-transparent focus:ring-0 flex-1 rounded  bg-white flex gap-2 w-full md:max-w-md lg:max-w-3xl items-center py-2 px-2 shadow-md"
                        >
                          <option
                            value={address.localidade.id}
                            selected={!!address.localidade.name}
                          >
                            {address.localidade.name
                              ? address.localidade.name
                              : 'selecione uma cidade'}
                          </option>
                          {cities.map((city) => (
                            <option value={city.ID} key={city.ID}>
                              {city.Name}
                            </option>
                          ))}
                        </select>
                      </FormGroup>

                      <FormGroup label={'Estado: '}>
                        <Input
                          type="text"
                          {...register('state')}
                          placeholder="Rua"
                        />
                      </FormGroup>
                    </div>
                    <div className="flex flex-col">
                      <h3>Coordenadas</h3>
                      <div className="flex items-center flex-wrap">
                        <FormGroup label={'lat: '}>
                          <Input
                            type="text"
                            {...register('lat')}
                            placeholder="Latitude"
                          />
                        </FormGroup>

                        <FormGroup label={'long: '}>
                          <Input
                            type="text"
                            {...register('long')}
                            placeholder="Longitude"
                          />
                        </FormGroup>

                        <Button
                          type="button"
                          onClick={() =>
                            handleGetCoordinates({
                              number: getValues('number'),
                              city: address.localidade.name,
                              state: address.uf,
                              street: getValues('street'),
                            })
                          }
                        >
                          Buscar
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-wrap gap-4">
            {/* Caracteristicas */}
            <div className="flex flex-col   min-w-[400px] bg-white shadow-lg rounded-lg p-4 mb-4">
              <h2>Caracteristicas</h2>
              <div className="h-full w-full  justify-center">
                <div className=" grid gap-6 flex-wrap h-full">
                  {rules?.attributes.map((attribute, index) => (
                    <div className="flex gap-1 items-center" key={attribute.id}>
                      <input
                        id={`attribute-${index}`}
                        type="checkbox"
                        value={`${attribute.id}`}
                        onChange={(e) =>
                          handleAddAttribute(e.target.checked, e.target.value)
                        }
                        className="h-4 w-4 rounded-full shadow focus:ring-0"
                      />
                      <Image
                        src={`/icons/${attribute.icon}.svg`}
                        alt=""
                        className="h-6 w-6"
                        width={24}
                        height={24}
                      />
                      <span>{attribute.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="flex flex-col min-w-[400px] flex-1   bg-white shadow-lg rounded-lg p-4">
              <h2>Regras</h2>
              <div className="flex gap-4 flex-1 flex-wrap">
                {rules?.rules.map((rule, index) => (
                  <div key={rule.id} className="flex flex-1">
                    <div className="flex w-full flex-col gap-2">
                      <span>{rule.title}</span>
                      <input
                        type="hidden"
                        {...register(`rules.${index}.id`, {
                          value: `${rule.id}`,
                        })}
                      />
                      <div className="flex flex-1">
                        <TextArea
                          value={rule.text}
                          {...register(`rules.${index}.text`)}
                          required
                        />
                      </div>

                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          id={`rule-${index}`}
                          value={`${index}_${rule.id}`}
                          onClick={(e) => handleAddDefaultText(e)}
                          className="h-4 w-4 rounded-full shadow focus:ring-0"
                        />
                        <label htmlFor="">usar texto padrão</label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Imagens */}
          <div className="flex flex-col w-full bg-white shadow-lg rounded-lg p-4 gap-6">
            <h2>Imagens</h2>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Imagem de capa</h3>
              <span className="text-sm ">escolha uma imagem de capa</span>

              <div className="flex flex-col md:flex-row items-center p-2">
                <FormGroup>
                  <input
                    type="file"
                    {...register('cover_image', {
                      onChange: (e) => handleChangeImage(e),
                    })}
                  />
                </FormGroup>
                {coverImage && (
                  <Image
                    src={coverImage}
                    className="w-96 "
                    alt="image"
                    width={200}
                    height={200}
                  />
                )}
              </div>
              <Divider />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Galeria de imagens</h3>
              <span className="text-sm">
                escolha no minimo 5 fotos para sua galeria
              </span>
              <div className="flex flex-col justify-center p-2">
                <FormGroup>
                  <input type="file" multiple onChange={imageHandler} />
                </FormGroup>

                <div className="flex gap-2 relative">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="w-96 h-96"
                      onClick={() => handleRemoveImage(image)}
                    >
                      <Image
                        src={image}
                        className="w-full h-full"
                        alt="image"
                        width={200}
                        height={200}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button filled type="submit" isLoading={isSubmitting}>
              enviar
            </Button>
          </div>
        </form>
      )}

      <Dialog
        open={false}
        onClose={() => setIsOpen(false)}
        className="relative z-50 rounded-lg"
      >
        <div
          className="fixed inset-0 bg-optionA-gray-dark/70"
          aria-hidden="true"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              className={
                'w-96 md:w-96 h-96 rounded bg-white  flex flex-col items-center p-4'
              }
            >
              <div className=" flex flex-1 flex-col mb-4 relative w-full">
                <Image
                  alt="success"
                  src="/icons/success.svg"
                  fill
                  className="w-full h-full"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-xl mb-4">
                  Cadastro Realizado com sucesso
                </span>
                <Button filled onClick={() => router.back()}>
                  Voltar ao menu
                </Button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
      <ToastContainer />
    </>
  )
}
