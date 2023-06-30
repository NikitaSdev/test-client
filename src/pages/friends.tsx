import Meta from "@/src/utils/meta/Meta"
import FriendsPage from "@/src/components/screens/FriendsPage/FriendsPage"

const Friends = () => {
  return (
    <>
      <Meta title={"Друзья"} description={"Список друзей"} />
      <FriendsPage />
    </>
  )
}

export default Friends
