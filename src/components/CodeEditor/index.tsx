import { useEffect, useRef } from "react"
import AceEditor from "react-ace"
import "brace/theme/monokai"

type ModesContext = {
  keys: () => string[]
  <T>(id: string): T
}

const modesContext: ModesContext = (require as any).context(
  "brace/mode",
  false,
  /^.*\.js$/
)
modesContext.keys().forEach(modesContext)

interface CodeEditorProps {
  index: number
  mode: string
  code: string
  setCode: (newCode: string) => void
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  index,
  mode,
  code,
  setCode,
}) => {
  const editorRef = useRef<AceEditor | null>(null)

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
  }

  useEffect(() => {
    if (editorRef.current) {
      const undoManager = editorRef.current.editor.getSession().getUndoManager()
      if (undoManager) {
        undoManager.reset()
      }
    }
  }, [index])

  return (
    <AceEditor
      mode={mode}
      theme="monokai"
      onChange={handleCodeChange}
      name="code-editor"
      editorProps={{ $blockScrolling: true }}
      fontSize={14}
      width="100%"
      height="100%"
      wrapEnabled={true}
      value={code}
      ref={editorRef}
    />
  )
}

export default CodeEditor
