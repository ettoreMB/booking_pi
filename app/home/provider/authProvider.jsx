
'use client'


import axios from 'axios'
import { useRouter } from 'next/navigation'
import { destroyCookie, setCookie } from 'nookies'


import { createContext, useState } from 'react'
 
export const AuthContext = createContext({})
 
export default function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: '1234',
    name: 'ettore muniz',
    permission: 'admin'
  })
  const [isloggedIn, setIsloggedIn] = useState(true)

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
        name: data.user_name,
        permission: data.permission,
      })
      setIsloggedIn(true)
      router.push('/')
  }

  async function signOut() {
    destroyCookie('bookingCookie', {path: '/'})
    setUser("")
    router.push('/')

    setIsloggedIn(false)
  }



  return (
    <AuthContext.Provider value={{signIn, signOut, isloggedIn, user}}>
      {children}
    </AuthContext.Provider>
  )
   
}