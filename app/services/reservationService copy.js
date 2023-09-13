import { api } from "./api";

 class ReservationService {
  constructor() {
    this.httpClient = api
  }


  async getReservationsByUserId(id) {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation/listByUserId/${id}`, {next: { revalidate: 10000 ,cache: 'no-store'} })
    return data.json()
  }

}

const reservationsService = new ReservationService()

export default reservationsService


