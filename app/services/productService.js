import { api } from "./api";

 class ProductsService {
  constructor() {
    this.httpClient = api
  }


  async getProducts(city) {
    if(city){
      const data = await fetch(`http://localhost:5000/product/listByCity?id=${city}`, {next: { revalidate: 5000 }})
      return data.json()
    } else {
      const data = await fetch('http://localhost:5000/product/list', {next: { revalidate: 5000 }})
      return data.json()
    }
  }

  async getProductsById(id) {
    const data = await fetch(`http://localhost:5000/product/${id}`, {next: { revalidate: 10000 ,cache: 'no-store'} })
    return data.json()
  }

  async getProductsByUserId(id) {
    const data = await fetch(`http://localhost:5000/product/listByUserId/${id}`, {next: { revalidate: 10000 ,cache: 'no-store'} })
    return data.json()
  }

}

const productsService = new ProductsService()

export default productsService


