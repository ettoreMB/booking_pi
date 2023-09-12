import Link from "next/link";


export default function MenuLink({href,children}) {
  return (
    <Link href={href} 
    className="my-2 font-semibold text-optionB-gray-dark hover:text-white bg-transparent hover:bg-optionB-main  cursor-pointer w-full rounded-md p-1 no-underline hover:no-underline">
  
     {children}
    
    </Link>
  )
}