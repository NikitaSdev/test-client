export interface IUser {
  avatarURL: string
  wrapperURL: string
  id: number
  email: string
  name: string
}
export interface IUserState {
  avatarURL: string
  wrapperURL: string
  id: number
  email: string
  name: string
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}
export interface IInitialState {
  user: IUserState | null
  isLoading: boolean
}
export interface IRegister {
  login: string
  email: string
  name: string
  password: string
}
export interface IEmailPassword {
  emailOrLogin: string
  password: string
}
export interface IAuthResponse extends ITokens {
  user: IUser
}
