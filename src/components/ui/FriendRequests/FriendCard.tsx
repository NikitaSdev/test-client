import { IUser } from "@/src/interfaces/user.interface"
import { Dispatch, FC, SetStateAction } from "react"
import Link from "next/link"
import Image from "next/image"
import { BsFillPersonDashFill } from "react-icons/bs"
import { UserService } from "@/src/services/user.service"

export type IFriendCard = Omit<IUser, "wrapperURL" | "email" | "friends">
const FriendCard: FC<
  IFriendCard & {
    userId: number
    setIsRefetchNeeded: Dispatch<SetStateAction<boolean>>
  }
> = ({ id, name, userId, setIsRefetchNeeded, avatarURL, description }) => {
  const deleteFriend = async () => {
    await UserService.deleteFriend(userId, id)
    setIsRefetchNeeded((prev) => !prev)
  }
  return (
    <>
      <Link href={`/profile/${id}`}>
        <div>
          <div>
            <Image src={avatarURL} alt={name} width={25} height={25} />
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        </div>
      </Link>
      <button onClick={deleteFriend}>
        <BsFillPersonDashFill />
      </button>
    </>
  )
}

export default FriendCard
