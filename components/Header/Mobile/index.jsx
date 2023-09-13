import Image from "next/image";
import Link from "next/link";

export default function MobileHeader() {
  return (
    <div className="w-full h-full flex justify-between items-center">
    <div>
      <Link href={'/'}>
        <Image src="/logo3.svg" alt="" /> 
      </Link>
    </div>
      <span>ICOn</span>
    
  </div>
  )
}