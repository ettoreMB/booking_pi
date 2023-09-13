import Image from "next/image";

export default function CategoryCardMobile({name}) {
  return (
    <div className="w-full rounded-lg flex flex-row shadow-md">
      <div className="flex flex-row">
        <Image 
          src="/icons/facebook.svg" 
          alt="hotel" 
        />
      </div>
    <div className="flex flex-col p-3">
      <h2 className="text-xl text-optionB-gray-dark font-bold">{name}</h2>
      <span className="text-sm text-optionB-gray-main">12312 {name}</span>
    </div>
  </div>
  )
}