import Meta from "@/src/utils/meta/Meta"
import MainContainer from "@/src/components/containers/MainContainer/MainContainer"
import { GetStaticProps } from "next"
import { UserService } from "@/src/services/user.service"
import { DeedService } from "@/src/services/deed.service"

export default function Home({
  usersCount,
  deedCount
}: {
  usersCount: number
  deedCount: number
}) {
  return (
    <>
      <Meta title={"Главная"} />
      <MainContainer>
        <section>
          <h1>На этом сайте вы можете записывать свои добрые дела</h1>
          <div>Нас уже - {usersCount} </div>
          <div>Мы сделали {deedCount} добрых дел</div>
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
