import { ChangeEvent, useState } from "react"
import { useDebounce } from "@/src/hooks/useDebounce"
import { useQuery } from "@tanstack/react-query"
import { UserService } from "@/src/services/user.service"

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearch = useDebounce(searchTerm, 500)

  const { isSuccess, data } = useQuery(
    ["search users", debouncedSearch],
    () => UserService.findByName(debouncedSearch),
    {
      select: ({ data }) => data,
      enabled: !!debouncedSearch
    }
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return { isSuccess, handleSearch, data, searchTerm }
}
