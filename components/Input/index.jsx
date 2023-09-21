import Image from 'next/image'
import { forwardRef } from 'react'

const InputBase = ({ icon = null, error = null, label = '', ...rest }, ref) => {
  return (
    <>
      {label && <label className="font-semibold">{label}</label>}
      <div
        className={`
          h-10 
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
          shadow-md
          focus:border-optionB-main
          ${!!error && 'border-2 border-red-dark bg-red-light'}
        `}
      >
        {!!icon && (
          <Image src={icon} alt="icon" className="h-6" width={20} height={20} />
        )}
        <input
          className={`
            border-0 h-full focus:outline-none ring-transparent focus:ring-0 flex-1 focus:border-optionB-main
            ${!!error && 'bg-red-light'}
            `}
          ref={ref}
          {...rest}
        />
      </div>
      {!!error && <span className="text-red-dark float-right">{error}</span>}
    </>
  )
}

export const Input = forwardRef(InputBase)
