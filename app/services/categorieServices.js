import axios from "axios";
import { api } from "./api";

 class CategoriesService {
  constructor() {
    this.httpClient = api
  }


  async getCategories() {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/category/list`, {next: { revalidate: 5000 }})
    
    return data
  }
}
const categoriesService = new CategoriesService()
export default categoriesService



