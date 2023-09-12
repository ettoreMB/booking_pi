import Link from "next/link";
import { Button } from "../../Button";
import UserBox from "../UserBox";
import { List } from "@phosphor-icons/react";

export default function WebHeader({loggedIn, onHandleLogout}) {
  return (
    <>
       <div className="w-full h-full flex justify-between items-center">
        <div>
          <Link href={'/'}>
            <img src="/logo3.svg" alt="" /> 
          </Link>
        </div>
        {loggedIn ? 
          (
            <div className="flex items-center gap-2">
              {/* <UserBox name={"ettore muniz"} onHandleLogout={onHandleLogout}/> */}
              <button className="flex items-center gap-2">
                Menu
                <List size={32} color="#545776" weight="fill" />
              </button>
            </div>
            
          ) : 
        (<div className="flex gap-10">
          <Link href={'/login'}>
            <Button filled size='sm' >Iniciar Sessao</Button>
          </Link>
          <Link href={'/signup'}>
            <Button size='sm'>Criar Conta</Button>
          </Link>
        </div>)}
      </div>
    </>
   
  )
}