export interface IUser{
	id:number
	name:string
	surname:string
	login:string
	password:string
	picture:string | undefined
	isPrivate:number
	user?: IUser
}

export type NewUser = Omit<IUser,'id'>	
export type AuthUser = Pick<IUser,"login" | "password">
export interface IResponse<T = unknown>{
	status:string
	message?: string
	payload:T
}
export interface IConnection{
	blockedMe:boolean
	didIBlock:boolean
	following:boolean
	followsMe:boolean
	requested:boolean
}
export type IAccount = Omit<IUser, 'password' | 'login'> & {
	posts:IPosts[]
	followers:IUser[]
	following:IUser[]
	connection:IConnection
}
export interface IContext{
	account : IUser
	setAccount:(user:IUser) => void
}
export interface IUpdateLogin{
	newLogin:string
	password:string
}
export interface IUpdatePassword{
	oldPassword:string
	newPassword:string
}
export interface IPreviewPost{
	image:string
	text:string
}
export interface IPosts{
	id:number
	title:string
	picture:string
	userId:number
	likes?:any[]
	comments:object
}
export interface ISearch {
	text:string
}

export interface UserListProps {
	user: IUser
}
export interface IComment {
	text:string
}