import { useEffect, useState } from "react"
import { useAuth } from "@/src/hooks/useAuth"
import { useRouter } from "next/router"
import FriendList from "@/src/components/ui/FriendRequests/FriendList"
import Search from "@/src/components/ui/Search/Search"

const FriendsPage = () => {
  const { user } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!user) router.replace("/")
  })
  const [isFind, setIsFind] = useState(false)
  return (
    <>
      <Search />
      {isFind ? <div></div> : <FriendList />}
    </>
  )
}

export default FriendsPage
