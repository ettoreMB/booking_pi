import { api } from "./api";

 class CategoriesService {
  constructor() {
    this.httpClient = api
  }


  async getCategories() {
    const data = await fetch('http://localhost:5000/category/list', {next: { revalidate: 5000 }})
    
    return data.json()
  }
}
const categoriesService = new CategoriesService()
export default categoriesService



