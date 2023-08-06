import { useState, useEffect } from "react"
import "./index.scss"

interface SnippetHeaderProps {
  title: string
  setTitle: (item: string) => void
  currentMode: string
  setCurrentMode: (text: string) => void
  setIsDescription: () => void
}

interface ModeProps {
  caption: string
  name: string
}

const SnippetHeader: React.FC<SnippetHeaderProps> = ({
  title,
  setTitle,
  currentMode,
  setCurrentMode,
  setIsDescription,
}) => {
  const [modes, setModes] = useState<ModeProps[]>([])
  const [toggleButton, setToggleButton] = useState(false)
  useEffect(() => {
    import("ace-builds/src-noconflict/ext-modelist").then((modelist) => {
      const modes = modelist.modes
      setModes(modes)
    })
  }, [])

  const handleDescriptionClick = () => {
    setIsDescription()
    setToggleButton(!toggleButton)
  }
  return (
    <div className="header-container">
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
        <select
          value={currentMode}
          onChange={(e) => setCurrentMode(e.target.value)}
          className="mode-select"
        >
          {modes.map((item, index) => {
            return (
              <option key={index} value={item.name}>
                {item.caption}
              </option>
            )
          })}
        </select>
      </div>
      <div
        className="description-button"
        onClick={() => {
          handleDescriptionClick()
        }}
      >
        {toggleButton && (
          <div>
            <i className="fas fa-toggle-on"></i>
          </div>
        )}
        {!toggleButton && (
          <div>
            <i className="fas fa-toggle-off"></i>
          </div>
        )}
      </div>
    </div>
  )
}

export default SnippetHeader
