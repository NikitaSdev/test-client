import axios from "axios"

import { API_URL } from "../config/api.config"

export const FileService = {
  async upload(file: FormData, folder?: string) {
    return axios.post<{ url: string; name: string }[]>(
      `${API_URL}/file`,
      file,
      {
        params: { folder },
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
  }
}
