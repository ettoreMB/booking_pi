
import { api } from "./api";

 class CitiesService {
  constructor() {
    this.httpClient = api
    this.base_url = 'http://localhost:3000'
  }


  async getCities() {
    // const {data} = await this.httpClient.get('/api/getCities')
    const data = await fetch(`http://localhost:5000/city/list`)
    return data.json()
  }
}

const citiesService = new CitiesService()

export default citiesService

