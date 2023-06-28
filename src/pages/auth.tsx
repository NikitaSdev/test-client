import Meta from "@/src/utils/meta/Meta"
import AuthPage from "@/src/components/screens/Auth/AuthPage"

export default function Auth() {
  return (
    <>
      <Meta title={"Авторизация"} />
      <main>
        <AuthPage />
      </main>
    </>
  )
}
