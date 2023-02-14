import React from 'react'
import { useAppContext } from '../context/app_context'
import Grid from '../Grid'
import axios from 'axios'
import styled from 'styled-components'
import { Button, Typography } from '@mui/material'
import { RxCrossCircled } from 'react-icons/rx'
import { GrDocumentCsv } from 'react-icons/gr'
import { fontWeight } from '@mui/system'
import UploadFileIcon from '@mui/icons-material/UploadFile'

const Upload = () => {
  const { file, setFile, setSessionId, isHeaderPresent, table, setTable } =
    useAppContext()

  const handleFileChange = (event) => {
    const file_data = event.target.files[0]
    setFile(file_data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    const params = {
      hasHeader: isHeaderPresent,
    }
    try {
      // <Loading />
      const response = await axios.post(
        'http://127.0.0.1:5000/file-upload' +
          '?' +
          new URLSearchParams(params).toString(),
        formData
      )
      setTable(JSON.parse(response.data['table']))
      setSessionId(response.data['session_id'])
    } catch (err) {
      console.error(err)
    }
  }
  // const describeData = async (event) => {
  // 	event.preventDefault();
  // 	const params = {
  // 		session_id: sessionId,
  // 	};
  // 	try {
  // 		const response = await axios.get(
  // 			"http://127.0.0.1:5000/describe-data" +
  // 				"?" +
  // 				new URLSearchParams(params).toString()
  // 		);
  // 		setTable(response.data);
  // 	} catch (err) {
  // 		setErrorData(err);
  // 		console.error(err);
  // 	}
  // };

  // const loadOriginalData = async (event) => {
  // 	event.preventDefault();
  // 	const params = {
  // 		session_id: sessionId,
  // 	};
  // 	try {
  // 		const response = await axios.get(
  // 			"http://127.0.0.1:5000/load-original" +
  // 				"?" +
  // 				new URLSearchParams(params).toString()
  // 		);
  // 		setTable(response.data);
  // 	} catch (err) {
  // 		setErrorData(err);
  // 		console.error(err);
  // 	}
  // };

  // const displayColumns = async (event) => {
  // 	event.preventDefault();
  // 	const params = {
  // 		session_id: sessionId,
  // 	};
  // 	try {
  // 		const response = await axios.post(
  // 			"http://127.0.0.1:5000/view-columns" +
  // 				"?" +
  // 				new URLSearchParams(params).toString(),
  // 			{
  // 				columns: multiSelectColumnNames,
  // 			}
  // 		);
  // 		setTable(response.data);
  // 	} catch (err) {
  // 		setErrorData(err);
  // 		console.error(err);
  // 	}
  // };

  // const columns = React.useMemo(
  // 	() =>
  // 		Object.keys(table[0] || {}).map((key, index) => ({
  // 			field: !isHeaderPresent ? `Column ${key}` : key,
  // 			headerName: key,
  // 			width: 100,
  // 		})),
  // 	[table]
  // );

  const handleDragOver = (event) => {
    event.preventDefault()
    setFile(event.target.files[0])
  }

  const handleDrop = (event) => {
    event.preventDefault()
  }

  return (
    <Wrapper>
      <section className='upload-section'>
        <Typography variant='h4' component='h2' sx={{ fontWeight: '600' }}>
          SpreadSheet Viz
        </Typography>
        <p>Accepted file formats: csv, xlsx, etc.</p>

        <h3>Upload Your File</h3>
        <form className='form-section'>
          <label
            htmlFor='file'
            className='file-input-style'
            onDragOver={handleDragOver}
            onDrag={handleDrop}
          >
            <input
              accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
              multiple
              type='file'
              id='file'
              onChange={handleFileChange}
              hidden
            />
            <UploadFileIcon fontSize='large' />
            <Typography>
              Drag & Drop or{' '}
              <Button size='small' component='span'>
                Browse
              </Button>
            </Typography>
          </label>
          {/* <button type='submit'>Submit</button> */}
          <Button variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow-dark);

  .upload-section {
    background-color: var(--clr-primary-200);
    padding: 2rem;
    box-shadow: var(--dark-shadow);
    border-radius: var(--radius);

    display: grid;
    gap: 2rem;
    justify-items: center;
  }

  .form-section {
    display: grid;
    grid-template-columns: 1fr;

    gap: 2rem;
    width: 100%;
  }

  .file-input-style {
    display: grid;
    place-items: center;
    gap: 1rem;

    border: 2px dashed black;
    padding: 2rem 3rem;
  }
`

export default Upload
