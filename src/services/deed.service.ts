import axios from "axios"
import { API_URL, getUsersUrl } from "@/src/config/api.config"

export const DeedService = {
  async getDeedsCount() {
    const { data } = await axios.get(`${API_URL}${getUsersUrl("/deed-count")}`)
    return data
  }
}
