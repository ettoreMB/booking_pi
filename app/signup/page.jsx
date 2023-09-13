import { Button } from "@/components/Button";
import Link from "next/link";

export default function SignupChoices(){
  return(
    <>
      <div className="h-[calc(100vh-153px)] w-full">
      <div className="h-full flex justify-center items-center gap-6">
        <Link href="/signup/user">
          <Button filled>Quero alugar</Button>
        </Link>
        <Link href={"/signup/admin"}>
          <Button>Quero Locar</Button>
        </Link>
      </div>
    </div>
    </>
    
  )
}