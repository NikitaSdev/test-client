import axios from "axios"
import { API_URL, getUsersUrl } from "@/src/config/api.config"
import { toastr } from "react-redux-toastr"
import { IUpdateProfile } from "@/src/interfaces/user.interface"
import { FormEvent } from "react"

export const UserService = {
  async findByName(name: string) {
    return await axios.get(`${API_URL}${getUsersUrl("/findUser")}`, {
      params: { name }
    })
  },
  async getAnotherUserDeeds(yourId: number, anotherUserId: number) {
    try {
      const { data } = await axios.post(
        `${API_URL}${getUsersUrl("/anotherUser")}`,
        { yourId, anotherUserId }
      )

      return data
    } catch (e) {
      toastr.error("Что-то пошло не так", "")
    }
  },

  async getUsersCount() {
    const { data } = await axios.get(`${API_URL}${getUsersUrl("/users-count")}`)
    return data
  },
  async sendFriendRequest(senderId: number, receiverId: number) {
    return await axios.post(`${API_URL}${getUsersUrl("/sendFriendRequest")}`, {
      senderId,
      receiverId
    })
  },
  async getSentFriendRequests(userId: number) {
    try {
      const { data } = await axios.post(
        `${API_URL}${getUsersUrl("/getSentFriendRequests")}`,
        { id: userId }
      )
      return data
    } catch (e) {
      toastr.error("Что-то пошло не так", "")
    }
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
      const { data } = await axios.post(`${API_URL}${getUsersUrl("/user")}`, {
        id: id
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
  },
  async deleteFriend(userId: number, friendId: number) {
    return await axios.delete(`${API_URL}${getUsersUrl("/friend")}`, {
      data: {
        userId,
        friendId
      }
    })
  },
  async updateUser(data: IUpdateProfile | FormEvent<HTMLFormElement>) {
    try {
      console.log(data)

      return await axios.patch(`${API_URL}${getUsersUrl("/profile")}`, data)
    } catch (e) {
      toastr.error("Что-то пошло не так", "")
    }
  }
}
