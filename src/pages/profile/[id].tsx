"use client"
import { FC, useEffect } from "react"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { UserService } from "@/src/services/user.service"
import { IUser } from "@/src/interfaces/user.interface"
import Meta from "@/src/utils/meta/Meta"
import { useAuth } from "@/src/hooks/useAuth"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { ParsedUrlQuery } from "querystring"
import { IDeed } from "@/src/interfaces/deed.interface"
import { v4 } from "uuid"
import { useDate } from "@/src/hooks/useDate"
import UserDeed from "@/src/components/ui/DeedCard/UserDeed"

const Profile: FC<{ id: string }> = ({ id }) => {
  const { user: you } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!you) router.replace("/")
  })

  const getAnotherUserDeeds = async () => {
    const anotherUser = await UserService.findById(parseInt(id as string))
    console.log(parseInt(id as string))
    if (you && anotherUser)
      return await UserService.getAnotherUserDeeds(you.id, anotherUser.id)
  }

  const { isLoading, data: anotherUser } = useQuery({
    queryKey: ["getAnotherUserDeeds"],
    queryFn: getAnotherUserDeeds
  })
  return (
    !isLoading && (
      <>
        <Meta title={anotherUser.name} />
        {anotherUser.name}
        {anotherUser.deeds &&
          anotherUser.deeds.map((deed: IDeed) => (
            <UserDeed
              key={v4()}
              id={deed.id}
              createdAt={deed.createdAt}
              title={deed.title}
              description={deed.description}
            />
          ))}
        dfgfdg
      </>
    )
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps<ParsedUrlQuery> = async (
  context
) => {
  const { query } = context
  const { id } = query

  return {
    props: {
      id
    }
  }
}
