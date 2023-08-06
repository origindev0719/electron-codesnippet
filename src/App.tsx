import React, { useState, useEffect } from "react"
import "./App.scss"
import MenuBar from "./components/MenuBar"
import CodeEditor from "./components/CodeEditor"
import SearchSnippets from "./components/SearchSnippets"
import SnippetHeader from "./components/SnippetHeader"
import Description from "./components/Description"

interface SnippetProps {
  title: string
  description: string
  code: string
  mode: string
}
export const App: React.FC = () => {
  const localStorageKey = "CodeSnippetsManager"
  const initSnippet: SnippetProps = {
    title: "New Snippet",
    description: "This is the snippet.",
    code: 'console.log("Hello World!")',
    mode: "javascript",
  }

  const [snippets, setSnippets] = useState([initSnippet])

  const [searchText, setSearchText] = useState("")
  const [searchFilter, setSearchFilter] = useState("ALL")

  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0)

  const [isDescription, setIsDescription] = useState(true)

  const handleMenuClick = (index: number) => {
    setCurrentSnippetIndex(index)
  }

  const handleBinClick = (index: number) => {
    const updatedSnippets = [...snippets]
    updatedSnippets.splice(index, 1)
    setSnippets(updatedSnippets)

    if (index >= updatedSnippets.length) {
      setCurrentSnippetIndex(updatedSnippets.length - 1)
    } else {
      setCurrentSnippetIndex(index)
    }
  }

  const handleCodeChange = (code: string) => {
    const updatedSnippets = snippets.map((item, index) => {
      return index === currentSnippetIndex ? { ...item, code: code } : item
    })
    setSnippets(updatedSnippets)
  }

  const handleAddClick = () => {
    setSnippets([initSnippet, ...snippets])
    setCurrentSnippetIndex(0)
  }

  const handleModeClick = (mode: string) => {
    const updatedSnippets = snippets.map((item, index) => {
      return index === currentSnippetIndex ? { ...item, mode: mode } : item
    })
    setSnippets(updatedSnippets)
  }

  const handleTitleChange = (title: string) => {
    const updatedSnippets = snippets.map((item, index) => {
      return index === currentSnippetIndex ? { ...item, title: title } : item
    })
    setSnippets(updatedSnippets)
  }

  const handleDescriptionChange = (description: string) => {
    const updatedSnippets = snippets.map((item, index) => {
      return index === currentSnippetIndex
        ? { ...item, description: description }
        : item
    })
    setSnippets(updatedSnippets)
  }

  const handleSearchTextChange = (text: string) => {
    setSearchText(text)
  }

  const handleSearchFilterChange = (filter: string) => {
    setSearchFilter(filter)
  }

  useEffect(() => {
    const storedData = localStorage.getItem(localStorageKey)
    const loadedArray = storedData && JSON.parse(storedData)

    if (loadedArray?.length === 0) {
    } else {
      setSnippets(loadedArray)
    }
  }, [])

  useEffect(() => {
    const jsonString = JSON.stringify(snippets)
    localStorage.setItem(localStorageKey, jsonString)
  }, [snippets])

  useEffect(() => {}, [searchText, searchFilter])

  return (
    <div className="app">
      <div className="app-header">
        <div className="app-title">Snippets Manager</div>
        <SearchSnippets
          searchText={searchText}
          setSearchText={handleSearchTextChange}
          searchFilter={searchFilter}
          setSearchFilter={handleSearchFilterChange}
        />
      </div>
      <div className="app-container">
        <MenuBar
          currentMenuIndex={currentSnippetIndex}
          menus={snippets}
          setMenuIndex={handleMenuClick}
          setBinIndex={handleBinClick}
          addNewSnippet={handleAddClick}
          searchText={searchText}
          searchFilter={searchFilter}
        />
        <div className="main">
          <SnippetHeader
            title={snippets[currentSnippetIndex]?.title}
            setTitle={handleTitleChange}
            currentMode={snippets[currentSnippetIndex]?.mode}
            setCurrentMode={handleModeClick}
            setIsDescription={() => setIsDescription(!isDescription)}
          />
          <div className="code-editor-container">
            {snippets?.length !== 0 && (
              <>
                <CodeEditor
                  index={currentSnippetIndex}
                  mode={snippets[currentSnippetIndex]?.mode}
                  code={snippets[currentSnippetIndex]?.code}
                  setCode={handleCodeChange}
                />
                {isDescription && (
                  <Description
                    index={currentSnippetIndex}
                    description={snippets[currentSnippetIndex]?.description}
                    setDescription={handleDescriptionChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="app-footer">
        <div>@SNIPPET-2023</div>
      </div>
    </div>
  )
}
