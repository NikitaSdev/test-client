import type { AppProps } from "next/app"
import "@/src/assets/styles/globals.scss"
import MainProvider from "../providers/MainProvider"
import { NextComponentType } from "next"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainProvider Component={Component as NextComponentType}>
      <Component {...pageProps} />
    </MainProvider>
  )
}
