import axios from "axios";
import { api } from "./api";

 class ProductsService {
  constructor() {
    this.httpClient = api
  }


  async getProducts(city) {
    if(city){
      const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/listByCity?id=${city}`, {next: { revalidate: 5000 }})
      return data.json()
    } else {
      const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/list`, {next: { revalidate: 5000 }})
      return data.json()
    }
  }

  async getProductsById(id) {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}`, {next: { revalidate: 10000 ,cache: 'no-store'} })
    return data
  }

  async getProductsByUserId(id) {
    const {data} =  await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/product/listByUserId/${id}`, {next: { revalidate: 10000 ,cache: 'no-store'} })

    return data
  }

}

const productsService = new ProductsService()

export default productsService


