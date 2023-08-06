import { useState } from "react"
import "./index.scss"

interface Option {
  id: string
  name: string
  value: string
}

interface SearchSnippetsProps {
  searchText: string
  setSearchText: (text: string) => void
  searchFilter: string
  setSearchFilter: (text: string) => void
}

const SearchSnippets: React.FC<SearchSnippetsProps> = ({
  searchText,
  setSearchText,
  searchFilter,
  setSearchFilter,
}) => {
  const [options] = useState<Option[]>([
    { id: "all", name: "filter", value: "ALL" },
    { id: "title", name: "filter", value: "TITLE" },
    { id: "description", name: "filter", value: "DESCRIPTION" },
  ])

  return (
    <div className="search-snippets-container">
      <div className="search-container">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
        <i className="fas fa-search search-icon"></i>
      </div>
      <select
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        className="filter-select"
      >
        {options.map((item, index) => {
          return (
            <option key={item.id} className="filter-option">
              {item.value}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default SearchSnippets
