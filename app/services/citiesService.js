
import axios from "axios";


 class CitiesService {



  async getCities() {
    // const {data} = await this.httpClient.get('/api/getCities')
    
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/city/list`)
  
    return data
  }
}

const citiesService = new CitiesService()

export default citiesService

