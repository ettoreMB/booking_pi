import { forwardRef } from "react"



const TextAreaBase = ({ ...rest }, ref) => {

  return (

    <textarea
      className="peer h-full min-h-[300px] w-full min-w-[300px] resize-none rounded-lg border border-stone-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-optionB-main  focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
      ref={ref}
      {...rest}
    />

  )
}

export const TextArea = forwardRef(TextAreaBase)