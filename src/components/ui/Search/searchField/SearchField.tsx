import { ChangeEvent, FC } from "react"

import styles from "./SearchField.module.scss"
import { MdSearch } from "react-icons/md"

interface ISearchField {
  searchTerm: string
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}
const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch }) => {
  return (
    <div className={styles.search}>
      <div>
        <MdSearch className={styles.icon} />

        <input
          className={styles.input}
          type="text"
          placeholder={"Поиск друзей"}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  )
}

export default SearchField
