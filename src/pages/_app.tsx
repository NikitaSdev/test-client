import type { AppProps } from "next/app"
import "@/src/assets/styles/globals.scss"
import MainProvider from "../providers/MainProvider"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainProvider Component={Component}>
      <Component {...pageProps} />
    </MainProvider>
  )
}
