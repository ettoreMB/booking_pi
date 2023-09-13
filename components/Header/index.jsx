'use client'

import { useContext, useEffect, useState } from "react"
import useScreenSize from "@/hooks/useScreenSize"
import { AuthContext } from "@/app/home/provider/authProvider"
import Link from "next/link"
import { Button } from "../Button"
import { List } from "@phosphor-icons/react"
import UserBox from "./UserBox"
import Avatar from "./Avatar"
import MenuLink from "./MenuLink"
import { usePathname, useSearchParams } from "next/navigation"
import Image from "next/image"


export default function Header() {
  const { signOut, user, isloggedIn } = useContext(AuthContext)
  const { width } = useScreenSize()

  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  function handleMenu() {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <header className="h-20 w-full  flex px-10 fixed top-0 z-10 bg-white shadow-lg"  >
        <div className="w-full h-full flex justify-between items-center">
          <div>
            <Link href={'/'}>
              <Image src="/logo3.svg" alt="" />
            </Link>
          </div>
          {(isloggedIn && user) && (<div className="flex items-center gap-2">
            <Avatar name={user.name} />
            <button className="flex items-center gap-2" onClick={handleMenu}>
              <List size={32} color="#545776" weight="fill" />
            </button>
          </div>)}


          {!isloggedIn && (
            <div className="flex gap-10">
              <Link href={'/login'}>
                <Button filled size='sm' >Iniciar Sessao</Button>
              </Link>
              <Link href={'/signup'}>
                <Button size='sm'>Criar Conta</Button>
              </Link>
            </div>)}
        </div>

      </header>

      {isOpen && (
        <div className="bg-white border-solid border-[1px] border-slate-500 top-[5rem]  right-[2.5rem] float-right   shadow-xl z-50 rounded-md fixed">
          <div className="flex flex-col w-full p-4">
            <UserBox name={"ettore muniz"} onHandleLogout={signOut} />
            {user.permission == 'admin' && (
              <>
                <span className="font-light text-optionB-gray-dark">administrador</span>
                <MenuLink href={`/user/admin/`}>Administração</MenuLink>
              </>
            )}
            {user.permission == 'user' && (
              <MenuLink href={"/"}>Minhas reservas</MenuLink>
            )}
            <span className="rounded-md bg-red-500 hover:bg-red-400  text-white font-medium flex justify-center" onClick={signOut}>Logout</span>
          </div>
        </div>)}
    </>

  )
}