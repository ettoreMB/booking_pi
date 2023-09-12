
export default function CalendarDay({istToday, children,disabled}) {
  return (
    <button
    className={`h-8 w-8  rounded-full text-center  aspect-square aspect-h-1 ${istToday && 'border-1 border-optionB-main' } bg-optionB-main text-white  disabled:hover:bg-transparent disabled:text-slate-200 disabled:bg-white  `}
    onClick={()=> console.log(istToday.toString())}
    disabled={disabled}
    >
      {children}

    </button>
  )
}