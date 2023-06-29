import { useEffect, useState } from "react"
import { useAuth } from "@/src/hooks/useAuth"
import { useRouter } from "next/router"
import MainContainer from "@/src/components/containers/MainContainer/MainContainer"
import FriendList from "@/src/components/ui/FriendRequests/FriendList"

const FriendsPage = () => {
  const { user } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!user) router.replace("/")
  })
  const [isFind, setIsFind] = useState(false)
  return (
    <MainContainer>
      <FriendList />
    </MainContainer>
  )
}

export default FriendsPage
