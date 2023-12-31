import Link from "next/link"
import { FC, useState } from "react"

import styles from "./SearchList.module.scss"
import { IUser } from "@/src/interfaces/user.interface"
import Image from "next/image"
import { UserService } from "@/src/services/user.service"
import { useAuth } from "@/src/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { IRequest } from "@/src/interfaces/request.interface"

const SearchList: FC<{ users: Array<IUser> }> = ({ users }) => {
  const { user: you } = useAuth()
  const [isRefetchNeeded, setIsRefetchNeeded] = useState(false)
  const sendFriendRequest = async (friendId: number) => {
    if (you) return await UserService.sendFriendRequest(you.id, friendId)
  }
  const getFriendRequests = async () => {
    if (you) return await UserService.getSentFriendRequests(you.id)
  }
  const { isLoading, data: sentFriendRequests } = useQuery({
    queryKey: ["sentFriendRequests", isRefetchNeeded],
    queryFn: getFriendRequests
  })

  return (
    <div className={styles.list}>
      {you && users ? (
        users.map((user: IUser) =>
          you.id !== user.id ? (
            <div key={user.id}>
              <Link href={`/profile/${user.id}`}>
                <Image
                  src={user.avatarURL}
                  width={50}
                  height={50}
                  alt={user.name}
                  draggable={false}
                />
                <h1>{user.name}</h1>
                <p>{user.description}</p>
              </Link>
              {!isLoading && (
                <button
                  onClick={() => {
                    const data = sendFriendRequest(user.id)
                    setIsRefetchNeeded((prev) => !prev)
                    return data
                  }}
                  disabled={sentFriendRequests.some(
                    (friendRequest: IRequest) =>
                      friendRequest.receiver.id === user.id
                  )}
                >
                  {sentFriendRequests.some(
                    (friendRequest: IRequest) =>
                      friendRequest.receiver.id === user.id
                  )
                    ? "Заявка отправлена"
                    : "Добавить в друзья"}
                </button>
              )}
            </div>
          ) : null
        )
      ) : (
        <div className={"text-white text-center my-4"}>
          Пользователи не найдены
        </div>
      )}
    </div>
  )
}

export default SearchList
