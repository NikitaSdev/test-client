import { FC, ReactNode } from "react"

const MainContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return <main>{children}</main>
}

export default MainContainer
