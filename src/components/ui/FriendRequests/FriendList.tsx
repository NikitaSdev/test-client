import { useAuth } from "@/src/hooks/useAuth"
import { UserService } from "@/src/services/user.service"
import { useQuery } from "@tanstack/react-query"
import RequestCard from "@/src/components/ui/FriendRequests/RequestCard"
import { v4 } from "uuid"
import { IRequest } from "@/src/interfaces/request.interface"
import { useEffect, useState } from "react"
import { checkAuth } from "@/src/store/user/user.actions"
import { IUser } from "@/src/interfaces/user.interface"
import FriendCard from "@/src/components/ui/FriendRequests/FriendCard"

const FriendList = () => {
  const { user } = useAuth()
  const [isRefetchNeeded, setisRefetchNeeded] = useState(false)
  useEffect(() => {
    checkAuth()
  }, [isRefetchNeeded])
  const getFriendRequests = async () => {
    if (user) return await UserService.getFriendRequest(user.id)
  }
  const { isLoading: isFriendRequestsLoading, data: friendRequests } = useQuery(
    {
      queryKey: ["getFriendRequests", isRefetchNeeded],
      queryFn: getFriendRequests
    }
  )

  const getFriends = async () => {
    if (user) return await UserService.findById(user.id)
  }
  const { isLoading: isFriendsLoading, data: friends } = useQuery({
    queryKey: ["getFriends", isRefetchNeeded],
    queryFn: getFriends
  })
  return (
    <>
      <section>
        {user &&
          !isFriendRequestsLoading &&
          friendRequests &&
          friendRequests.map((item: IRequest) => (
            <RequestCard
              setIsRefetchNeeded={setisRefetchNeeded}
              key={v4()}
              requestId={item.id}
              userId={user.id}
              createdAt={item.createdAt}
              sender={item.sender}
            />
          ))}
      </section>
      <section>
        {user &&
          !isFriendsLoading &&
          friends &&
          friends.friends.map((friend: IUser) => (
            <FriendCard
              setIsRefetchNeeded={setisRefetchNeeded}
              key={v4()}
              id={friend.id}
              userId={user.id}
              description={friend.description}
              name={friend.name}
              avatarURL={friend.avatarURL}
            />
          ))}
      </section>
    </>
  )
}

export default FriendList
