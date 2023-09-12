import { getWeekDays } from "@/utils/getWeekDays";

import dayjs from "dayjs";
import { useMemo, useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarDay from './CalendarDay'


export default function Calendar({nextMonth}) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const shortWeekDays = getWeekDays({ short: true })
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  
  const calendarWeeks = useMemo(() => {
    const blockedDates = {blockedWeekDays:[], blockedDates:['2-9-2023', '25-9-2023', '28-9-2023', '3-10-2023']}

    if(!blockedDates){
      return []
    }
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth()
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })
    
    const firstWeek = currentDate.get('day')
    
    const previousMonthFilledArray = Array.from({
      length: firstWeek,
    }).map((_,i)=> {
      return currentDate.subtract(i + 1 , 'day')
    }).reverse()

    const lastDayInCurrentMonth =  currentDate.set('date', currentDate.daysInMonth())

    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFilledArray = Array.from({
      length: 7 - (lastWeekDay + 1)
    }).map((_,i)=> {
      return lastDayInCurrentMonth.add(i +1, 'day')
    })

    const calendarDays = [
      ...previousMonthFilledArray.map(date => {
        return {date, disabled: true}
      }),
      ...daysInMonthArray.map((date)=> {
        
        
        return {
          date,
          disabled: date.endOf('day').isBefore(new Date()) ||
          blockedDates?.blockedDates?.includes(String(`${date.get(`date`)}-${date.get(`month`) + 1}-${date.get(`year`)}`))
        }
      }),
      ...nextMonthFilledArray.map(date => {
        return {date, disabled: false ||date.endOf('day').isBefore(new Date()) }
      }) 
    ]

    const calendarWeeks = calendarDays.reduce(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if(isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7)
          })
        }
        
        return weeks
      }, []
    )
   
    return calendarWeeks
  }, [currentDate])


function handleNextMonth() {
  const nextMonth = currentDate.add(1, 'month')
  setCurrentDate(nextMonth)
}

function handlePreviousMonth(){
  const previousMonth = currentDate.subtract(1, 'month')
  setCurrentDate(previousMonth)
}
  return (
  
    <div className="flex-col gap-6 p-6 max-w-sm  h-52">
      <CalendarHeader month={currentMonth} year={currentYear} onHandleNextMonth={handleNextMonth} onHandlePreviousMonth={handlePreviousMonth} />
      <table className="border-spacing-1 table-fixed w-full max-w-lg h-full ">
        <thead>
          <tr className="font-medium text-sm">
            {shortWeekDays.map(weekday => (
              <th key={weekday}>{weekday}.</th>
            ))}
          </tr>
        </thead>
        <tbody className="before:block before:content-[.]">
         {calendarWeeks.map(({week, days})=> {
          return (
            <tr key={week}>
              {days.map(({date, disabled})=>{
                return(
                  <td key={date.toString()} className="box-border">
                    <CalendarDay istToday={dayjs().get('date') === date.get('date')} disabled={disabled}>
                      {date.get('date')}
                    </CalendarDay>
                  </td>
                )
              })}
            </tr>
          )
         })}
        </tbody>
      </table>
      
    </div>
    
   
  )
}

