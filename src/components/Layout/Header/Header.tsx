import Image from "next/image"
import logo from "@/src/assets/images/logo.svg"
import { useAuth } from "@/src/hooks/useAuth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
const Header = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
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
      {isClient && user ? (
        <button>
          <Image src={user.avatarURL} alt={"Аватар"} width={25} height={25} />
          <p>{user.name}</p>
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
