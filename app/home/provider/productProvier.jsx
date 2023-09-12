'use client'

import dayjs from 'dayjs'
import { createContext, useState } from 'react'
 
export const ProductContext = createContext({})
 
export default function ProductProvider({ children }) {
  const [calendarValues, setCalendarValues] = useState([])
  const [totalDays, setTotalDays] = useState(0)
  const [checkInHours, setCheckInHours] = useState({
    checkIn: "",
    checkOut: ""
  })
  

  const [formValues, setFormValues] = useState()

  function handleCalendarValue(values) {
    const parseDates = values.map(date => {
      return dayjs(date).format("DD/MM/YYYY")
    })  

    setCalendarValues(parseDates)
    setTotalDays(dayjs(values[1]).diff(values[0], "days") + 1 )
  }

  function handleCheckInHour(value) {
    setCheckInHours({
      ...checkInHours,
      checkIn: value
    })
    
  }

  function handleCheckOutHour(value) {
    setCheckInHours({
      ...checkInHours,
      checkOut: value
    })
  }

  function handleFormValues(data) {
    setFormValues(data)
  }

  return (
    <ProductContext.Provider value={{calendarValues, handleCalendarValue, totalDays, handleCheckOutHour, handleCheckInHour, checkInHours, handleFormValues}}>
      {children}
    </ProductContext.Provider>
  )
  }