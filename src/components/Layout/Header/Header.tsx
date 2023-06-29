import Image from "next/image"
import logo from "@/src/assets/images/logo.svg"
import { useAuth } from "@/src/hooks/useAuth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
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
          <li>
            <Link href={"/friends"}>Друзья</Link>
          </li>
          <li>
            <Link href={"/good-deeds"}>Добрые дела</Link>
          </li>
        </ul>
      </nav>
      {isClient && user ? (
        <button>
          <Link href={"/profile"}>
            <Image src={user.avatarURL} alt={"Аватар"} width={25} height={25} />
            <p>{user.name}</p>
          </Link>
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
