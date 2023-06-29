import { FC, ReactNode } from "react"
import styles from "./MainContainer.module.scss"
const MainContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.mainContainer}>
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default MainContainer
