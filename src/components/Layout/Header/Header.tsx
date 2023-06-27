import Image from "next/image"
import logo from "@/src/assets/images/logo.svg"
import { useAuth } from "@/src/hooks/useAuth"
import { useRouter } from "next/router"
const Header = () => {
  const { user } = useAuth()
  const router = useRouter()
  return (
    <header>
      <Image src={logo} alt={"Хорошие дела"} />
      <nav>
        <ul>
          <li>Друзья</li>
          <li>Добрые дела</li>
        </ul>
      </nav>
      {user ? (
        <button>
          <Image src={user.avatarURL} alt={"Аватар"} />
          <p>Профиль</p>
        </button>
      ) : (
        <button onClick={() => router.push("auth")}>
          <p>Войти</p>
        </button>
      )}
    </header>
  )
}

export default Header
