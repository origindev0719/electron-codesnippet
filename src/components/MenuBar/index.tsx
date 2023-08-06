import React from "react"
import "./index.scss"

interface Menubar {
  title: string
  description: string
  code: string
  mode: string
}

interface MenubarProps {
  currentMenuIndex: number
  menus: Menubar[]
  setMenuIndex: (index: number) => void
  setBinIndex: (index: number) => void
  addNewSnippet: () => void
  searchText: string
  searchFilter: string
}
const MenuBar: React.FC<MenubarProps> = ({
  currentMenuIndex,
  menus,
  setMenuIndex,
  setBinIndex,
  addNewSnippet,
  searchText,
  searchFilter,
}) => {
  const isFiltered = (item: Menubar) => {
    switch (searchFilter) {
      case "ALL":
        return (
          item.title.toUpperCase().includes(searchText.toUpperCase()) ||
          item.description.toUpperCase().includes(searchText.toUpperCase())
        )
        break
      case "TITLE":
        return item.title.toUpperCase().includes(searchText.toUpperCase())
        break
      case "DESCRIPTION":
        return item.description.toUpperCase().includes(searchText.toUpperCase())
    }
    return false
  }
  const handleMenuClick = (index: number) => {
    setMenuIndex(index)
  }
  const handleBinClick = (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
    setBinIndex(index)
  }
  const handleAddClick = () => {
    addNewSnippet()
  }
  return (
    <>
      <div className="menu-bar">
        <div className="menu-header">
          <div className="menu plus-menu" onClick={handleAddClick}>
            <i className="fas fa-plus"></i>
            <span className="add-title">Add New</span>
          </div>
        </div>

        {menus.map((item, index) => {
          return (
            isFiltered(item) === true && (
              <div
                className={`menu ${currentMenuIndex === index ? "active" : ""}`}
                onClick={() => handleMenuClick(index)}
                key={index}
              >
                <div className="title">
                  <i className="fas fa-message"></i>
                  {item.title}
                </div>
                <div
                  className="bin"
                  onClick={(event) => handleBinClick(index, event)}
                >
                  ✖
                </div>
              </div>
            )
          )
        })}
      </div>
    </>
  )
}

export default MenuBar
