import axios from "axios"

import { removeTokensStorage, saveToStorage } from "./auth.helper"
import { IAuthResponse } from "@/src/interfaces/user.interface"

import Cookies from "js-cookie"
import { getContentType } from "@/src/utils/api.helpers"
import { API_URL, getAuthUrl } from "@/src/config/api.config"
import { useRouter } from "next/router"
import { checkAuth } from "@/src/store/user/user.actions"

export const AuthService = {
  async register(email: string, password: string, login: string, name: string) {
    const response = await axios.post<IAuthResponse>(
      `${API_URL}${getAuthUrl("/register")}`,
      {
        email,
        password,
        login,
        name
      }
    )

    if (response.data.accessToken) {
      saveToStorage(response.data)
    }
    return response
  },
  async login(emailOrLogin: string, password: string) {
    const response = await axios.post<IAuthResponse>(
      `${API_URL}${getAuthUrl("/login")}`,
      {
        emailOrLogin,
        password
      }
    )

    if (response.data.accessToken) {
      saveToStorage(response.data)
    }

    return response
  },
  logout() {
    removeTokensStorage()
    localStorage.removeItem("user")
    checkAuth()
  },
  async getNewTokens() {
    const refreshToken = Cookies.get("refreshToken")
    const response = await axios.post<IAuthResponse>(
      `${API_URL}${getAuthUrl("/login/access-token")}`,
      {
        refreshToken
      },
      {
        headers: getContentType()
      }
    )

    if (response.data.accessToken) {
      saveToStorage(response.data)
    }

    return response
  }
}
