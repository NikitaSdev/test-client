import axios from "axios"
import { API_URL, getUsersUrl } from "@/src/config/api.config"
import { IDeed, IDeedCreate } from "@/src/interfaces/deed.interface"
import { toastr } from "react-redux-toastr"

export const DeedService = {
  async getDeeds(id: number) {
    try {
      const { data } = await axios.get(`${API_URL}${getUsersUrl("/deed")}`, {
        data: id
      })

      return data
    } catch (e) {
      toastr.error("что-то пошло не так", "")
    }
  },
  async createDeed(data: IDeedCreate) {
    try {
      return await axios.post(`${API_URL}${getUsersUrl("/deed")}`, data)
    } catch (e) {
      toastr.error("что-то пошло не так", "")
    }
  },
  async getDeedsCount() {
    const { data } = await axios.get(`${API_URL}${getUsersUrl("/deed-count")}`)
    return data
  },
  async update(data: IDeed, id: number) {
    try {
      return await axios.patch(`${API_URL}${getUsersUrl("/deed")}`, {
        title: data.title,
        description: data.description,
        id
      })
    } catch (e) {
      toastr.error("Что-то пошло не так", "")
    }
  },
  async delete(deedId: number) {
    try {
      return await axios.delete(`${API_URL}${getUsersUrl("/deed")}`, {
        data: {
          deedId: deedId
        }
      })
    } catch (e) {
      toastr.error("Что-то пошло не так", "")
    }
  }
}
