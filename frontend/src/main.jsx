import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Body from './Body'
import { AppProvider } from './context/app_context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <React.StrictMode>
      <Body />
    </React.StrictMode>
  </AppProvider>
)
