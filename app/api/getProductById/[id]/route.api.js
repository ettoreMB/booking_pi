
import { NextResponse } from "next/server";

export async function GET(request, context){
  const  id = context.params.id
  const images =[
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1519690889869-e705e59f72e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  ]
  const data = [
    {id:1,name: 'hotel candeias', city:'santa catarina',address:"rua floresta 610", category: 'hotel', images},
    {id:2, name:'hotel azul', city: 'sao paulo',address:"rua floresta 610", category: 'hotel', images},
    {id:3, name:'hotel da floresta', city: 'amazonas',address:"rua floresta 610", category: 'hotel', images},
    {id:4, name:'casa de praia', city: 'salvador',address:"rua floresta 610", category: 'casa', images},
    {id:5, name:'chale quentinho', city: 'belo horizonte',address:"rua floresta 610", category: 'casa', images},
    {id:6, name:'apartamento grande', city: 'sao paulo',address:"rua floresta 610", category: 'casa', images},
    {id:7, name:'sitio enorme', city:'belo horizonte',address:"rua floresta 610", category: 'sitio', images},
    {id:8, name:'chacara encantada', city: 'sao paulo',address:"rua floresta 610", category: 'sitio', images},
    {id:9,name:'fazenda', city: 'goias', category: 'sitio',address:"rua floresta 610", images},
  ]
  
  const result = data.find(item => item.id === Number(id))
  
  return NextResponse.json(result)
}       