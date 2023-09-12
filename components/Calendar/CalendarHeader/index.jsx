import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export default function CalendarHeader({month, year, onHandlePreviousMonth, onHandleNextMonth}) {
  return(
    <div className="flex items-center justify-between px-4 mb-2 max-w-lg">
        <div className="text-md capitalize flex">
          <div className="gap-4 flex">{month}<span className="text-optionB-gray-dark">{year}</span></div>
          
        </div>
        <div className="flex gap-2 text-optionB-gray-dark">
          <button className="pointer rounded-sm">
            <CaretLeft onClick={onHandlePreviousMonth}/>
          </button>
          <button className="pointer rounded-sm">
            <CaretRight onClick={onHandleNextMonth}/>
          </button>
        </div>
      </div>
  )
}