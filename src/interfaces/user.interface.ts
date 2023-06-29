export interface IUser {
  avatarURL: string
  wrapperURL: string
  id: number
  email: string
  name: string
  description: string
  friends: Array<IUser>
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}
export interface IInitialState {
  user: IUser | null
  isLoading: boolean
}
export interface IRegister {
  login: string
  email: string
  name: string
  password: string
  confirmPassword: string
}

export interface ILogin {
  emailOrLogin: string
  password: string
}
export interface IAuthResponse extends ITokens {
  user: IUser
}
export interface IUpdateProfile {
  id: number
  wrapperURL: string
  avatarURL: string
  name: string
}
