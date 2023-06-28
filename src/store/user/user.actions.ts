import { createAsyncThunk } from "@reduxjs/toolkit"
import { toastr } from "react-redux-toastr"

import { toastError } from "@/src/utils/toastError"
import { errorCatch } from "@/src/utils/api.helpers"
import { AuthService } from "@/src/services/auth/auth.service"
import {
  IAuthResponse,
  ILogin,
  IRegister
} from "@/src/store/user/user.interface"

export const register = createAsyncThunk<IAuthResponse, IRegister>(
  "auth/register",
  async ({ email, password, login, name }, thunkAPI) => {
    try {
      const response = await AuthService.register(email, password, login, name)
      return response.data
    } catch (e: unknown) {
      toastError(e, "Ошибка")
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const login = createAsyncThunk<IAuthResponse, ILogin>(
  "auth/login",
  async ({ emailOrLogin, password }, thunkAPI) => {
    try {
      const response = await AuthService.login(emailOrLogin, password)
      return response.data
    } catch (e) {
      toastError(e, "Ошибка")
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
  "auth/check-auth",
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.getNewTokens()
      return response.data
    } catch (e) {
      if (errorCatch(e) == "jwt expired") {
        toastError("Logout", "Your authorization is expired")
        thunkAPI.dispatch(logout())
      }
      return thunkAPI.rejectWithValue(e)
    }
  }
)
