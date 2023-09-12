
import { NextResponse } from "next/server";

export async function GET(request, context){

  const  city = context.params.city

  const data = [
    {id:1,name: 'hotel candeias',city:'florianopolis', category: 'hotel'},
    {id:2, name:'hotel azul',city:'sao paulo', category: 'hotel'},
    {id:3, name:'hotel da floresta',city:'salvador', category: 'hotel'},
    {id:4, name:'casa de praia',city: 'salvador', category: 'casa'},
    {id:5, name:'chale quentinho',city: 'belo horizonte', category: 'casa'},
    {id:6, name:'apartamento grande',city: 'sao paulo', category: 'casa'},
    {id:7, name:'sitio enorme',city:'belo horizonte', category: 'sitio'},
    {id:8,name:'chacara encantada',city: 'sao paulo', category: 'sitio'},
    {id:9,name:'fazenda',city: 'goias', category: 'sitio'},
    {id:10,name: 'hotel ibis',city:'rio de janeiro', category: 'hotel'},
  ]
  

  const result = data.filter(item => item.city === city)


  return NextResponse.json(result)
}       