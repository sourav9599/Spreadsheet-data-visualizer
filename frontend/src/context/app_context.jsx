import React, { useContext, useState } from 'react'

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [unChecked, setUnChecked] = useState([])
  const [menuItem, setMenuItem] = useState({})
  const [checked, setChecked] = React.useState([])

  return (
    <AppContext.Provider
      value={{ unChecked, setUnChecked, checked, setChecked }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
