import Footer from "@/src/components/Layout/Footer/Footer"
import Header from "@/src/components/Layout/Header/Header"
import { FC, ReactNode } from "react"
import styles from "./Layout.module.scss"
import MainContainer from "@/src/components/containers/MainContainer/MainContainer"

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <MainContainer>{children}</MainContainer>
      <Footer />
    </div>
  )
}

export default Layout
