import { Dispatch, FC, SetStateAction } from "react"
import { useDate } from "@/src/hooks/useDate"
import { UserService } from "@/src/services/user.service"
import { BsFillPersonDashFill, BsFillPersonPlusFill } from "react-icons/bs"
import Image from "next/image"
import { ISenderAndReceiver } from "@/src/interfaces/request.interface"

interface IRequestCard {
  requestId: number
  userId: number
  createdAt: Date
  sender: ISenderAndReceiver
  setIsRefetchNeeded: Dispatch<SetStateAction<boolean>>
}

const RequestCard: FC<IRequestCard> = ({
  setIsRefetchNeeded,
  requestId,
  userId,
  sender,
  createdAt
}) => {
  const date = useDate(new Date(createdAt))
  const acceptRequest = async () => {
    await UserService.acceptRequest(userId, sender.id)
    setIsRefetchNeeded((prev) => !prev)
  }
  const declineRequest = async () => {
    await UserService.declineRequest(requestId)
    setIsRefetchNeeded((prev) => !prev)
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
