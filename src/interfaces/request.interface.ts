export interface ISenderAndReceiver {
  id: number
  description: string
  name: string
  avatarURL: string
}
export interface IRequest {
  id: number
  createdAt: Date
  status: "pending" | "accepted" | "declined"
  sender: ISenderAndReceiver
  receiver: ISenderAndReceiver
}
