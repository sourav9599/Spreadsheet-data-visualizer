import React, { useState } from 'react'
import axios from 'axios'
import Grid from './Grid'
import { useAppContext } from './context/app_context'
import Upload from './components/Upload'
import Testing from './components/Testing'

const App = () => {
  const { table, setTable, isHeaderPresent } = useAppContext()

  console.log(Boolean(Object.keys(table).length))
  return (
    <main>
      {Boolean(Object.keys(table).length) ? (
        <Grid
          table={table}
          setTable={setTable}
          isHeaderPresent={isHeaderPresent}
        />
      ) : (
        <Upload />
      )}
    </main>
  )
}

export default App
