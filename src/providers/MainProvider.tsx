import { FC, ReactNode } from "react"

import { Provider } from "react-redux"

import Layout from "@/src/components/Layout/Layout"

import { store } from "@/src/store/store"

import AuthProvider from "./AuthProvider/AuthProvider"
import HeadProvider from "./HeadProvider/HeadProvider"
import ReduxToast from "./ReduxToast"
import { QueryClient } from "@tanstack/query-core"
import { QueryClientProvider } from "@tanstack/react-query"
import { NextComponentType } from "next"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const MainProvider: FC<{
  children: ReactNode
  Component: NextComponentType
}> = ({ children, Component }) => {
  return (
    <HeadProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReduxToast />
          <AuthProvider Component={Component}>
            <Layout>{children}</Layout>
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </HeadProvider>
  )
}

export default MainProvider
