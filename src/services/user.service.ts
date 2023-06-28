import axios from "axios"
import { API_URL, getUsersUrl } from "@/src/config/api.config"
import { toastr } from "react-redux-toastr"

export const UserService = {
  async getUsersCount() {
    const { data } = await axios.get(`${API_URL}${getUsersUrl("/users-count")}`)
    return data
  },
  async getFriendRequest(userId: number) {
    try {
      const { data } = await axios.get(
        `${API_URL}${getUsersUrl("/friend-requests")}`,
        { data: userId }
      )
      return data
    } catch (e) {
      toastr.error("Что-то пошло не так", "")
    }
  },
  async findById(id: number) {
    try {
      const { data } = await axios.get(`${API_URL}${getUsersUrl("/user")}`, {
        data: { id: id }
      })
      return data
    } catch (e) {
      toastr.error("Что-то пошло не так", "")
    }
  },
  async acceptRequest(userId: number, senderId: number) {
    return await axios.post(
      `${API_URL}${getUsersUrl("/acceptFriendRequest")}`,
      {
        userId,
        senderId
      }
    )
  },
  async declineRequest(requestId: number) {
    return await axios.post(
      `${API_URL}${getUsersUrl("/declineFriendRequest")}`,
      {
        requestId
      }
    )
  }
}
