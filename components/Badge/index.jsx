export default function Badge({number}) {
  return (
    <div className="font-bold flex flex-col items-end">
      <div 
        className="rounded-xl bg-optionB-gray-dark text-white w-8 h-7 flex items-center justify-center ">
        {number}
      </div>
     
    </div>
  )
}