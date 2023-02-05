import React, { useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import FormStyle from '../component-styles/FormStyle'

import Form from './Form'
import Filters from './Filters'
import { Box } from '@mui/system'
import FilterOptions from './FilterOptions'

const Body = () => {
  const [file, setFile] = useState(null)
  const [isHeaderPresent, setIsHeaderPresent] = useState(false)
  const [table, setTable] = useState([{}])
  const [isUploaded, setIsUploaded] = useState(false)
  const [errorData, setErrorData] = useState()

  const handleFileChange = (event) => {
    const file_data = event.target.files[0]
    console.log(event.target.files[0])
    setFile(file_data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    const headers = {
      hasHeader: isHeaderPresent,
    }
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/file-upload',
        formData,
        { headers: headers }
      )
      setTable(response.data['data'])
      setIsUploaded(true)
    } catch (err) {
      setErrorData(err)
      console.error(err)
    }
  }
  const columns = React.useMemo(
    () =>
      Object.keys(table[0] || {}).map((key) => ({
        name: `Column ${key}`,
        selector: key,
        sortable: true,
      })),
    [table]
  )
  return (
    <FormStyle>
      {!isUploaded && (
        <>
          <Form
            handleSubmit={handleSubmit}
            handleFileChange={handleFileChange}
            filename={file}
            isHeaderPresent={isHeaderPresent}
            setIsHeaderPresent={setIsHeaderPresent}
          />
          {JSON.stringify(errorData)}
        </>
      )}
      {isUploaded && (
        <>
          <Filters />
          <Form
            handleSubmit={handleSubmit}
            handleFileChange={handleFileChange}
            filename={file}
            isHeaderPresent={isHeaderPresent}
            setIsHeaderPresent={setIsHeaderPresent}
          />
          <div style={{ overflow: 'auto' }} className='section-table'>
            <FilterOptions />
            <div>
              <DataTable
                columns={columns}
                data={table}
                pagination
                paginationPerPage={10}
              />
            </div>
          </div>
        </>
      )}
    </FormStyle>
  )
}

export default Body
