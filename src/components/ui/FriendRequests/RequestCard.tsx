import { FC } from "react"
import { useDate } from "@/src/hooks/useDate"
import { UserService } from "@/src/services/user.service"
import { useQuery } from "@tanstack/react-query"
import { BsFillPersonDashFill, BsFillPersonPlusFill } from "react-icons/bs"
import Image from "next/image"
import { ISender } from "@/src/interfaces/request.interface"

interface IRequestCard {
  id: number
  createdAt: Date
  sender: ISender
}

const RequestCard: FC<IRequestCard> = ({ id, sender, createdAt }) => {
  const date = useDate(new Date(createdAt))
  const acceptRequest = async () => {
    return await UserService.acceptFriendRequest()
  }
  const declineRequest = async () => {
    return await UserService.declineRequest()
  }
  return (
    <div>
      <>
        <div>
          <Image
            src={sender.avatarURL}
            alt={sender.name}
            width={25}
            height={25}
          />
          <div>
            <h1>{sender.name}</h1>
            {sender.description && sender.description !== "О Вас" && (
              <p>{sender.description}</p>
            )}
          </div>

          <p>{date}</p>
        </div>
        <div>
          <button onClick={acceptRequest}>
            <BsFillPersonPlusFill />
          </button>
          <button onClick={declineRequest}>
            <BsFillPersonDashFill />
          </button>
        </div>
      </>
    </div>
  )
}

export default RequestCard
