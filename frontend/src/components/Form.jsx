import React from 'react'
import { GoCloudUpload } from 'react-icons/go'

const Form = ({ handleSubmit, handleFileChange }) => {
  return (
    <div className='section-form'>
      <h2>Upload Files Here</h2>
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor='file'>
          <GoCloudUpload />
          <input type='file' id='file' onChange={handleFileChange} hidden />
        </label>
        <button type='submit' className='btn-upload'>
          Upload
        </button>
      </form>
    </div>
  )
}

export default Form
