import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className={`w-full h-12 bg-optionB-main flex justify-between  fixed bottom-0 items-center px-10`} 
    >
      <div>
       <span className="text-sm text-white font-bold">
        ©2023 Digital Booking
       </span>
      </div>
      <div className="flex gap-7">
        <Image src="/icons/facebook.svg" alt="" width={20} height={20}/>
        <Image src="/icons/instagran.svg" alt="" width={20} height={20}/>
        <Image src="/icons/twitter.svg" alt=""width={20} height={20} />
        <Image src="/icons/linkedin.svg" alt="" width={20} height={20}/>
      </div>
    </footer>
  )
}