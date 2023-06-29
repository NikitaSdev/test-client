import MainContainer from "@/src/components/containers/MainContainer/MainContainer"
import CreateDeed from "@/src/components/ui/CreateDeed/CreateDeed"
import { GetStaticProps } from "next"
import { UserService } from "@/src/services/user.service"
import { DeedService } from "@/src/services/deed.service"
import { useAuth } from "@/src/hooks/useAuth"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { v4 as uuidv4 } from "uuid"
import { IDeed } from "@/src/interfaces/deed.interface"
import DeedCard from "@/src/components/ui/DeedCard/DeedCard"
import Meta from "@/src/utils/meta/Meta"

const GoodDeeds = () => {
  const { user } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!user) router.replace("/")
  })
  const [isRefetchNeeded, setIsRefetchNeeded] = useState(false)
  const getDeeds = async () => {
    if (user) return await DeedService.getDeeds(user.id)
  }
  const { isLoading, data } = useQuery({
    queryKey: ["getDeeds", isRefetchNeeded],
    queryFn: getDeeds
  })
  console.log(data)
  return (
    <>
      <Meta title={"Ваши добрые дела"} />
      <CreateDeed setIsRefetchNeeded={setIsRefetchNeeded} />
      {!isLoading && data && (
        <section onClick={() => setIsRefetchNeeded((prev) => !prev)}>
          {data.map((item: IDeed) => (
            <DeedCard
              setIsRefetchNeeded={setIsRefetchNeeded}
              key={item.id}
              title={item.title}
              id={item.id}
              description={item.description}
              createdAt={item.createdAt}
            />
          ))}
        </section>
      )}
    </>
  )
}

export default GoodDeeds
