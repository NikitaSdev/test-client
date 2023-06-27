
import axios from "axios"


import { removeTokensStorage, saveToStorage } from "./auth.helper"
import {IAuthResponse} from "@/src/store/user/user.interface";
import {APP_URL, getAuthUrl} from "@/src/api/api.config";
import Cookies from "js-cookie";
import {getContentType} from "@/src/utils/api.helpers";

export const AuthService = {
    async register(email: string, password: string,login:string) {
        const response = await axios.post<IAuthResponse>(
            `${APP_URL}${getAuthUrl("/register")}`,
            {
                email,
                password,
                login
            }
        )

        if (response.data.accessToken) {
            saveToStorage(response.data)
        }
        return response
    },
    async login(email: string, password: string) {
        const response = await axios.post<IAuthResponse>(
            `${APP_URL}${getAuthUrl("/login")}`,
            {
                email,
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
    },
    async getNewTokens() {
        const refreshToken = Cookies.get("refreshToken")
        const response = await axios.post<IAuthResponse>(
            `${APP_URL}${getAuthUrl("/login/access-token")}`,
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