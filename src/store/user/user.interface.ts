
export interface  IUser {
	_id: string
	email: string
	password: string
	createdAt: string
	isAdmin: boolean
}
export interface IUserState {
	email: string
	isAdmin: boolean
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}
export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}
export interface IRegister{
	login:string
	email:string
	name:string
	password:string
}
export interface IEmailPassword {
	emailOrLogin: string
	password: string
}
export interface IAuthResponse extends ITokens {
	user: IUser
}
