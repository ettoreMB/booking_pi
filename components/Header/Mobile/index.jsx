import Link from "next/link";

export default function MobileHeader() {
  return (
    <div className="w-full h-full flex justify-between items-center">
    <div>
      <Link href={'/'}>
        <img src="/logo3.svg" alt="" /> 
      </Link>
    </div>
      <span>ICOn</span>
    
  </div>
  )
}