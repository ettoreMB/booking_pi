
'use client'


import axios from 'axios'
import { useRouter } from 'next/navigation'
import { destroyCookie, setCookie, parseCookies } from 'nookies'


import { createContext, useEffect, useState } from 'react'
 
export const AuthContext = createContext({})
 
export default function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: '',
    name: '',
    permission: ''
  })
  const [isloggedIn, setIsloggedIn] = useState(false)

  const router = useRouter()
  async function signIn({email, password}) {
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/auth`, {
        email,
        password
      })
      setCookie(null, 'bookingCookie', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
      setUser({
        id: data.id,
        name: data.user_name,
        permission: data.permission,
      })
     
      sessionStorage.setItem("user_name", data.user_name)
      sessionStorage.setItem("user_id", data.id)
      sessionStorage.setItem("user_permission", data.permission)

  
      setIsloggedIn(true)
      router.push('/')
  }

  async function signOut() {
    destroyCookie('bookingCookie', {path: '/'})
    sessionStorage.clear()
    setUser({})
    setIsloggedIn(false)
    router.refresh()
    router.push('/')
  }

 useEffect(() => {
  const {'bookingCookie': cookie} = parseCookies() 
  if(!!cookie && !!sessionStorage.key("user_id")) {
    const userName = sessionStorage.getItem("user_name")
    const userId = sessionStorage.getItem("user_id")
    const userPermission = sessionStorage.getItem("user_permission")
    setUser({
      id: userId,
      name: userName,
      permission: userPermission
    })
    setIsloggedIn(true)
    return
  }
    
 }, [])


  return (
    <AuthContext.Provider value={{signIn, signOut, isloggedIn, user}}>
      {children}
    </AuthContext.Provider>
  )
   
}