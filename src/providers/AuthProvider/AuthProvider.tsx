import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { FC, ReactNode, useEffect } from "react"

import { useActions } from "@/src/hooks/useActions"
import { useAuth } from "@/src/hooks/useAuth"
import { AppProps } from "next/app"
import { Roboto } from "@next/font/google"

const roboto = Roboto({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"]
})
const AuthProvider: FC<{ children: ReactNode; Component: AppProps }> = ({
  children
}) => {
  const { user } = useAuth()
  const { logout, checkAuth } = useActions()
  const { pathname } = useRouter()
  useEffect(() => {
    const accessToken = Cookies.get("accessToken")
    if (accessToken) checkAuth()
  }, [])

  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken")
    if (!refreshToken && user) logout()
  }, [pathname])
  return <div className={roboto.className}>{children}</div>
}

export default AuthProvider
