
import { NextResponse } from "next/server";

export async function POST(request, response){
  // const {data} = api.get('/categories')

  const {email, password} = request.body

  const userMail = 'mail@mail.com'
  const userPassword = '123'
  
  if(userMail === email && password === userPassword) {
    return new Response({
      token: `123456`
    },{
      status: 201
    })
  }
  
  return new Response('nao autorizado',{
    status: 401
  })
}