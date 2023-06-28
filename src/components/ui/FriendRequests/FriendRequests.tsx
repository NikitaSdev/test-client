import { useAuth } from "@/src/hooks/useAuth"
import { UserService } from "@/src/services/user.service"
import { useQuery } from "@tanstack/react-query"
import RequestCard from "@/src/components/ui/FriendRequests/RequestCard"
import { v4 } from "uuid"
import { IRequest } from "@/src/interfaces/request.interface"
import { it } from "node:test"

const FriendRequests = () => {
  const { user } = useAuth()
  const getFriendRequests = async () => {
    if (user) return await UserService.getFriendRequest(user.id)
  }
  const { isLoading, data } = useQuery({
    queryKey: ["getFriendRequests"],
    queryFn: getFriendRequests
  })
  console.log(data)

  return (
    <div>
      {!isLoading &&
        data &&
        data.map((item: IRequest) => (
          <RequestCard
            key={v4()}
            id={item.id}
            createdAt={item.createdAt}
            sender={item.sender}
          />
        ))}
    </div>
  )
}

export default FriendRequests
