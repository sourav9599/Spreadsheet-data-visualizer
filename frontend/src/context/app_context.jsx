import React, { useContext, useState } from 'react'

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [unChecked, setUnChecked] = useState([])
  const [menuItem, setMenuItem] = useState({})
  const [checked, setChecked] = useState([])
  const [loading, setLoading] = useState(false)

  // From Previous App Component

  const [file, setFile] = useState(null)
  const [sessionId, setSessionId] = useState('')
  const [isHeaderPresent, setIsHeaderPresent] = useState(true)
  const [table, setTable] = useState({})

  return (
    <AppContext.Provider
      value={{
        unChecked,
        setUnChecked,
        checked,
        setChecked,
        file,
        setFile,
        setSessionId,
        isHeaderPresent,
        table,
        setTable,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
