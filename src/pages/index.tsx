import Meta from "@/src/utils/meta/Meta"
import MainContainer from "@/src/components/containers/MainContainer/MainContainer"
import { GetStaticProps } from "next"
import { UserService } from "@/src/services/user.service"
import { DeedService } from "@/src/services/deed.service"
import { useAuth } from "@/src/hooks/useAuth"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home({
  usersCount,
  deedCount
}: {
  usersCount: number
  deedCount: number
}) {
  const { user } = useAuth()
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <>
      <Meta title={"Главная"} />
      <MainContainer>
        <section>
          <h1>На этом сайте вы можете записывать свои добрые дела</h1>
          <div>
            <h1>Нас уже - {usersCount} </h1>
          </div>
          <div>
            <h1>Мы сделали {deedCount} добрых дел</h1>
          </div>
          <section>
            {isClient && user ? (
              <Link href={"/good-deeds"}>
                <button>Записать свое доброе дело</button>
              </Link>
            ) : (
              <Link href={"/auth"}>
                <button>Присоединиться к нам</button>
              </Link>
            )}
          </section>
        </section>
      </MainContainer>
    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  try {
    const usersCount = await UserService.getUsersCount()
    const deedCount = await DeedService.getDeedsCount()
    return {
      props: {
        usersCount: usersCount,
        deedCount: deedCount
      },
      revalidate: 60
    }
  } catch (e) {
    return {
      notFound: true
    }
  }
}
