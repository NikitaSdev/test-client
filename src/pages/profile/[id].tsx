import { FC, useEffect } from "react"
import { GetServerSideProps } from "next"
import { UserService } from "@/src/services/user.service"
import Meta from "@/src/utils/meta/Meta"
import { useAuth } from "@/src/hooks/useAuth"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { ParsedUrlQuery } from "querystring"
import { IDeed } from "@/src/interfaces/deed.interface"
import { v4 } from "uuid"
import UserDeed from "@/src/components/ui/DeedCard/UserDeed"
import Image from "next/image"
const Profile: FC<{ id: string }> = ({ id }) => {
  const { user: you } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!you) router.replace("/")
    if (you?.id === parseInt(id)) router.replace("/profile")
  })

  const getAnotherUserDeeds = async () => {
    const anotherUser = await UserService.findById(parseInt(id as string))
    if (you && anotherUser)
      return await UserService.getAnotherUserDeeds(you.id, anotherUser.id)
  }

  const { isLoading, data: anotherUser } = useQuery({
    queryKey: ["getAnotherUserDeeds"],
    queryFn: getAnotherUserDeeds
  })
  console.log(anotherUser)
  return (
    !isLoading && (
      <>
        <Meta title={anotherUser.name} />
        <section style={{ background: `url(${anotherUser.wrapperURL})` }}>
          <Image
            src={anotherUser.avatarURL}
            alt={anotherUser.name}
            width={250}
            height={250}
          />
          <h1>{anotherUser.name}</h1>
          <p>
            {anotherUser.description !== "О Вас" && anotherUser.description}
          </p>
        </section>
        <section>
          {anotherUser.deeds ? (
            <h1>Что хорошего сделал {anotherUser.name}</h1>
          ) : (
            <h1>{anotherUser.name} пока что ничего не сделал</h1>
          )}
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
        </section>
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
