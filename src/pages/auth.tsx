import Meta from "@/src/utils/meta/Meta"
import AuthPage from "@/src/components/screens/AuthPage/AuthPage"
import MainContainer from "@/src/components/containers/MainContainer/MainContainer"

export default function Auth() {
  return (
    <>
      <Meta title={"Авторизация"} />
      <MainContainer>
        <AuthPage />
      </MainContainer>
    </>
  )
}
