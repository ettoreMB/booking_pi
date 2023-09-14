import Image from "next/image";

export default function Rating() {
  return(
    <div className=" flex gap-1">
      <Image src="/icons/star.svg" alt="" className="h-4 w-4" width={16} height={16}/>
      <Image src="/icons/star.svg" alt="" className="h-4 w-4"width={16} height={16}/>
      <Image src="/icons/star.svg" alt="" className="h-4 w-4"width={16} height={16}/>
      <Image src="/icons/star.svg" alt="" className="h-4 w-4"width={16} height={16}/>
      <Image src="/icons/star.svg" alt="" className="h-4 w-4"width={16} height={16}/>
    </div>
  )
}