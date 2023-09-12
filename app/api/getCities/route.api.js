
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request){

  const {data} =  await axios.get('http://localhost:5000/city/list')
  
  return NextResponse.json(data)
}