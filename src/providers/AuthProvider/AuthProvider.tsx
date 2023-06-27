import Cookies from "js-cookie"
import { useRouter } from "next/router"
import {FC, ReactNode, useEffect} from "react"

import { useActions } from "@/src/hooks/useActions"
import { useAuth } from "@/src/hooks/useAuth"



const AuthProvider: FC<{children:ReactNode,Component:any}> = ({
	children,
	Component: { isOnlyUser, isOnlyAdmin }
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
	return (
		<>{children}</>
	) }

export default AuthProvider
