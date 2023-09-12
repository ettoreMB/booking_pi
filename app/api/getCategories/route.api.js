
import { NextResponse } from "next/server";

export async function GET(request){
  // const {data} = api.get('/categories')

  const data = [
    {name: 'hotel'},
    {name: 'casa'},
    {name:'sitio'},

  ]
  
  return NextResponse.json(data)
}