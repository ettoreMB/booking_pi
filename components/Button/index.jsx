import { CircularProgress } from "@mui/material"


export function Button({children, filled, size,isLoading = false,...rest}, ref)  {
  const sm = 'w-[206px]'
  const md = 'w-[296px]'
  const lg = 'w-[346px]'
  const xlg = 'w-[362px]'


  function handleButtonSize() {
  
    switch (size) {
      case 'sm' :
         return sm
      case 'md' :
        return md
      case 'lg':
        return lg
      case 'xlg':
        return xlg
      default:
        return 'md'
    }
  }
  return (
    <button
    className={`
    h-10
    px-2
    text-base
    ${filled ? 'bg-optionB-main border-0 text-gray-100' : 'bg-white border-4 border-optionB-main text-optionB-main'}
    hover:bg-opacity-75
    rounded
    ${handleButtonSize()}
    disabled:bg-slate-400
    `} 
    disabled={isLoading}
    {...rest}
    >
      {isLoading && (<CircularProgress size={30} sx={{color: "#FFF"}} />)}
      {!isLoading && children}
      
    </button>
  )
}


