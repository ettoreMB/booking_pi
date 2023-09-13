

import dayjs from "dayjs";
import { useContext } from "react";
import { DateRangePicker } from 'rsuite';
import customParseFormat from "dayjs/plugin/customParseFormat"


import { Input } from "@/components/Input";
import { ProductContext } from "@/app/home/provider/productProvier";
import { MapPin } from "@phosphor-icons/react";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { toastError } from "@/utils/toasts";
import Image from "next/image";

dayjs.extend(customParseFormat)

const hours = Array.from({
  length: 24
}).map((_, i) => {
  const hour = i < 10 ? `${0}${i}` : i
  return `${hour}:00`
})


const BookingFormSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  observation: z.string().nullable(),
})

export default function BookingForm({product}) {
  const router = useRouter()
  const { combine, allowedMaxDays, beforeToday, } = DateRangePicker;

  const { handleCalendarValue, handleCheckOutHour, handleCheckInHour, handleFormValues, calendarValues, checkInHours, totalDays } = useContext(ProductContext)

  const { handleSubmit,register, formState: {isSubmitting },getValues } = useForm({
    resolver: zodResolver(BookingFormSchema)
  })

  async function submitCheckIn(data) {
 
    const bodyData = {
      product_id: product.id,
      user_id: "123f20a7-1ba0-4378-bc4a-e1827d132554",
      checkIn: `${dayjs(calendarValues[1]).format("YYYY-MM-DD")}T${checkInHours.checkIn}:00`,
      checkout: `${dayjs(calendarValues[1]).format("YYYY-MM-DD")}T${checkInHours.checkOut}:00`,
      observation: data.observation,
    }
    
   try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reservation/create`, bodyData)
    router.push('/success')
    
   } catch(err) {
    toastError('Erro ao realizar reserva, Por favor tente mais tarde')
   }
  }

  return (
    <>
      <form  className="h-full w-full flex gap-4" onSubmit={handleSubmit(submitCheckIn)} > 
        <div className="w-1/2 pr-4 shadow-xl h-full">
          <div className="flex flex-col gap-4  p-2 my-4">
            <h2>Complete seus dados</h2>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col flex-1">
                <label htmlFor="">Nome</label>
                <Input {...register("name")} />
              </div>

              <div className="flex flex-col flex-1">
                <label htmlFor="">Sobrenome</label>
                <Input {...register("lastName")} />
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col flex-1">
                <label htmlFor="">Email</label>
                <Input {...register("email")}/>
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="">Telefone</label>
                <Input {...register("phoneNumber")}/>
              </div>
            </div>
          </div>

          <div className="flex flex-col  p-2 my-4">
            <h2>Selecione sua data da reserva</h2>
            <DateRangePicker size="lg" format="dd-MM-yyyy" shouldDisableDate={beforeToday()} onOk={(e) => handleCalendarValue(e)} onClean={(e) => handleCalendarValue([])} />
          </div>

          <div className="flex gap-4  p-2 my-4">
            <div className="flex flex-col w-full">
              <label htmlFor="">Entrada</label>
              <select className="" id='inicial' onChange={(e) => handleCheckInHour(e.target.value)}>
                <option value="" >Selecionar hora</option>
                {hours.map(h => (
                  <option value={h} key={h} >{h}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="">Saida</label>
              <select className="" id='final' onChange={(e) => handleCheckOutHour(e.target.value)}>
                <option value="">Selecionar hora</option>
                {hours.map(h => (
                  <option value={h} key={h} >{h}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="">
            <textarea 
            {...register("observation")}
            className="w-full h-40  flex-1 resize-none border-1 rounded-md" 
            placeholder="Deixe aqui seu comentário ou qualquer duvida sobre sua hospedagem" />
          </div>
        </div>

        <div className="w-1/2 flex items-center">
          <div className="w-full h-full flex flex-col shadow-lg p-4 gap-2">
            <h2>Detalhes da reserva</h2>
            <Image src={product.cover_image_url} alt="" className="h-1/3 object-cover mb-2" />

            <span className="font-semibold text-2xl">{product.name}</span>
            <span className="text-lg font-medium">{product.category}</span>

            <div className="flex items-center gap-2 mb-4">
              <MapPin weight="fill" />
              <span className="text-medium font-bold">{product.address}</span>
            </div>

            <div className=" h-1.5 border-b-[1px]  border-x-optionB-gray-light w-full mb-4"></div>

            <div className="flex justify-between font-semibold text-xl mb-2">
              <span>Check In</span>
              <span>{calendarValues[0] ?? "_/_/_"} {checkInHours.checkIn}</span>

            </div>
            <div className="flex justify-between font-semibold text-xl mb-2">
              <span>Check Out</span>
              <span>{calendarValues[1] ?? "_/_/_"} {checkInHours.checkOut}</span>

            </div>

            <div className=" h-1.5 border-b-[1px]  border-optionB-gray-main w-full mb-4"></div>

            <div className="flex justify-between text-lg font-medium mb-4">
              <span>Total</span>
              <span>R$ {totalDays * 35}</span>
            </div>

            <Button filled type="submit" isLoading={isSubmitting}>
              Confirmar reserva
            </Button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>


  )
}