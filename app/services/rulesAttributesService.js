import axios from "axios";
import { api } from "./api";

 class RulesAttributesService {
  constructor() {
    this.httpClient = api
  }


  async getRulesAttributes() {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/rulesAttributes`, {next: { revalidate: 10000 ,cache: 'no-store'} })
    

    return data
  }

}

const rulesAttributesService = new RulesAttributesService()

export default rulesAttributesService


