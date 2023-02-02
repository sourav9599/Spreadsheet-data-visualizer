import React, { useState } from 'react'
import axios from 'axios'
import JSONTable from './Jsontable'
import DataTable from 'react-data-table-component'
import FormStyle from '../component-styles/FormStyle'
import { GoCloudUpload } from 'react-icons/go'
import Form from './Form'
import Filters from './Filters'

const Header = () => {
  const [file, setFile] = useState(null)
  const [table, setTable] = useState([{}])
  const [isUploaded, setIsUploaded] = useState(false)

  const handleFileChange = (event) => {
    const file_data = event.target.files[0]
    setFile(file_data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/file-upload',
        formData
      )
      setTable(response.data)
      setIsUploaded(true)
    } catch (error) {
      console.error(error)
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
        <Form handleSubmit={handleSubmit} handleFileChange={handleFileChange} />
      )}
      {isUploaded && (
        <>
          <Filters />

          <div style={{ overflow: 'auto' }} className='section-table'>
            <DataTable
              columns={columns}
              data={table}
              pagination
              paginationPerPage={10}
            />
          </div>
        </>
      )}
    </FormStyle>
  )
}

export default Header
