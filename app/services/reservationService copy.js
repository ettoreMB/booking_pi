import axios from "axios";
import { api } from "./api";

 class ReservationService {
  constructor() {
    this.httpClient = api
  }


  async getReservationsByUserId(id) {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation/listByUserId/${id}`)
    return data
  }

}

const reservationsService = new ReservationService()

export default reservationsService


