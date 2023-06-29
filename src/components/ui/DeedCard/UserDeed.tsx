import { FC } from "react"
import { IDeed } from "@/src/interfaces/deed.interface"
import { useDate } from "@/src/hooks/useDate"

const UserDeed: FC<IDeed> = ({ title, description, createdAt }) => {
  const date = useDate(new Date(createdAt))
  return (
    <div>
      <p>{date}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default UserDeed
