import React, { useState } from 'react'

import Editor from '@monaco-editor/react'
import { ClockLoader as Loader } from 'react-spinners'

export default function WebEditor({ language, value }) {
  const [theme, setTheme] = useState('vs-dark')
  // const [editorLanguage, setEditorLanguage] = useState("javascript");

  function toggleTheme() {
    setTheme(theme === 'light' ? 'vs-dark' : 'light')
  }
  const handleOpenInVSCode = () => {
    const encodedContent = encodeURIComponent(value)
    window.location.href = `vscode://file/C:\\Users\\soura\\Desktop\\app.py`
  }

  return (
    <>
      <button onClick={toggleTheme}>Toggle theme</button>
      {/* <button onClick={handleOpenInVSCode}>Open in VS Code</button> */}
      <Editor
        height='calc(100% - 19px)' // By default, it fully fits with its parent
        theme={theme}
        language={language}
        loading={<Loader />}
        value={value}
        options={{
          wordWrap: 'on',
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </>
  )
}
