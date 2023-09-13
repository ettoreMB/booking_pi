
import { api } from "./api";

 class CitiesService {
  constructor() {
    this.httpClient = api
    this.base_url = `${process.env.NEXT_PUBLIC_BASE_URL}`
  }


  async getCities() {
    // const {data} = await this.httpClient.get('/api/getCities')
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/city/list`)
    return data.json()
  }
}

const citiesService = new CitiesService()

export default citiesService

