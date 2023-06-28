import { useAuth } from "@/src/hooks/useAuth"
import { UserService } from "@/src/services/user.service"
import { useQuery } from "@tanstack/react-query"
import RequestCard from "@/src/components/ui/FriendRequests/RequestCard"
import { v4 } from "uuid"
import { IRequest } from "@/src/interfaces/request.interface"
import { it } from "node:test"
import { useState } from "react"

const FriendRequests = () => {
  const { user } = useAuth()
  const [isRefetchNeeded, setisRefetchNeeded] = useState(false)
  const getFriendRequests = async () => {
    if (user) return await UserService.getFriendRequest(user.id)
  }
  const { isLoading, data } = useQuery({
    queryKey: ["getFriendRequests", isRefetchNeeded],
    queryFn: getFriendRequests
  })

  return (
    <div>
      {user &&
        !isLoading &&
        data &&
        data.map((item: IRequest) => (
          <RequestCard
            setIsRefetchNeeded={setisRefetchNeeded}
            key={v4()}
            requestId={item.id}
            userId={user.id}
            createdAt={item.createdAt}
            sender={item.sender}
          />
        ))}
    </div>
  )
}

export default FriendRequests
