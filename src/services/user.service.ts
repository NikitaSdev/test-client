import axios from "axios"
import { API_URL, getUsersUrl } from "@/src/config/api.config"

export const UserService = {
  async getUsersCount() {
    const { data } = await axios.get(`${API_URL}${getUsersUrl("/users-count")}`)
    return data
  }
}
