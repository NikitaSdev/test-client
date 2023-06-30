import Meta from "@/src/utils/meta/Meta"
import AuthPage from "@/src/components/screens/AuthPage/AuthPage"

export default function Auth() {
  return (
    <>
      <Meta title={"Авторизация"} description={"Вход в аккаунт"} />
      <AuthPage />
    </>
  )
}
