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
import { Link } from 'react-router-dom'

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

  const handleRemoveFile = () => {
    setFile(null)
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

  return (
    <Wrapper>
      <section className='upload-section'>
        <Typography variant='h4' component='h2' sx={{ fontWeight: '600' }}>
          SpreadSheet Viz
        </Typography>
        <p>Accepted file formats: csv, xlsx, etc.</p>

        <h3>Upload Your File</h3>
        <form className='form-section'>
          <label htmlFor='file' className='file-input-style'>
            {!!file ? (
              <div className='file-input-after'>
                <GrDocumentCsv />
                <Typography size='small' component='span'>
                  {!!file && file.name}
                </Typography>
                <RxCrossCircled
                  onClick={handleRemoveFile}
                  style={{ color: 'red' }}
                />
              </div>
            ) : (
              <div className='file-input-before'>
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
              </div>
            )}
          </label>
          {/* <button type='submit'>Submit</button> */}

          <Button variant='contained' onClick={handleSubmit} fullWidth>
            <Link
              to='/grid'
              style={{
                textDecoration: 'none',
                color: 'var(--white)',
                width: '100%',
              }}
            >
              Submit
            </Link>
          </Button>
        </form>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: calc(100vh - 64px);
  display: grid;
  place-items: center;
  box-shadow: var(--shadow-dark);
  background-color: var(--clr-primary-500);

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

  .file-input-before {
    display: grid;
    justify-items: center;
    gap: 1rem;
  }

  .file-input-after {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    justify-content: space-between;
    gap: 2rem;
    align-items: center;
    svg {
      height: 2rem;
      width: 2rem;
    }
  }
`

export default Upload
