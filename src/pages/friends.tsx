import React from "react"
import MainContainer from "@/src/components/containers/MainContainer/MainContainer"
import Meta from "@/src/utils/meta/Meta"
import FriendsPage from "@/src/components/screens/FriendsPage/FriendsPage"

const Friends = () => {
  return (
    <>
      <Meta title={"Друзья"} />
      <MainContainer>
        <FriendsPage />
      </MainContainer>
    </>
  )
}

export default Friends
