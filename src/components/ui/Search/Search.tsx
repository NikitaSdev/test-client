import cn from "classnames"
import { FC } from "react"

import styles from "./Search.module.scss"
import { useSearch } from "@/src/components/ui/Search/UseSearch"
import SearchField from "@/src/components/ui/Search/searchField/SearchField"
import SearchList from "@/src/components/ui/Search/SearchList/SearchList"

const Search: FC<{
  className?: string
}> = ({ className }) => {
  const { isSuccess, data, handleSearch, searchTerm } = useSearch()
  console.log(data)
  return (
    <div className={cn(styles.wrapper, className)}>
      <SearchField searchTerm={searchTerm} handleSearch={handleSearch} />

      {isSuccess && <SearchList users={data} />}
    </div>
  )
}

export default Search
