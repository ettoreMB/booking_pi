
import { NextResponse } from "next/server";

export async function GET(request){
  
  const data = [
    {id:1,name: 'hotel candeias',city:'florianopolis', category: 'hotel', distance_center: Math.floor(Math.random() * 500)},
    {id:2, name:'hotel azul',city:'sao paulo', category: 'hotel', distance_center: Math.floor(Math.random() * 500)},
    {id:3, name:'hotel da floresta',city:'salvador', category: 'hotel', distance_center: Math.floor(Math.random() * 500)},
    {id:4, name:'casa de praia',city: 'salvador', category: 'casa', distance_center: Math.floor(Math.random() * 500)},
    {id:5, name:'chale quentinho',city: 'belo horizonte', category: 'casa', distance_center: Math.floor(Math.random() * 500)},
    {id:6, name:'apartamento grande',city: 'sao paulo', category: 'casa', distance_center: Math.floor(Math.random() * 500)},
    {id:7, name:'sitio enorme',city:'belo horizonte', category: 'sitio', distance_center: Math.floor(Math.random() * 500)},
    {id:8,name:'chacara encantada',city: 'sao paulo', category: 'sitio', distance_center: Math.floor(Math.random() * 500)},
    {id:9,name:'fazenda',city: 'goias', category: 'sitio', distance_center: Math.floor(Math.random() * 500)},
    {id:10,name: 'hotel ibis',city:'rio de janeiro', category: 'hotel', distance_center: Math.floor(Math.random() * 500)},
  ]
  
  return NextResponse.json(data)
}       