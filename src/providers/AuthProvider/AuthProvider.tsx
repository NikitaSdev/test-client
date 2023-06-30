import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { FC, ReactNode, useEffect } from "react"

import { useActions } from "@/src/hooks/useActions"
import { useAuth } from "@/src/hooks/useAuth"

import { Roboto } from "@next/font/google"
import { NextComponentType } from "next"

const roboto = Roboto({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"]
})
const AuthProvider: FC<{
  children: ReactNode
  Component: NextComponentType
}> = ({ children }) => {
  const { user } = useAuth()
  const { logout, checkAuth } = useActions()
  const { pathname } = useRouter()
  useEffect(() => {
    const accessToken = Cookies.get("accessToken")
    if (accessToken) checkAuth()
  }, [checkAuth])

  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken")
    if (!refreshToken && user) logout()
  }, [pathname, logout, user])
  return (
    <div className={roboto.className} style={{ height: "100%" }}>
      {children}
    </div>
  )
}

export default AuthProvider
