import { useRef, useState } from 'react'
import './Chatgpt.css'
import axios from 'axios'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {
  docco,
  atomOneLight,
  atomOneDark,
} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Suggestions from './Suggestions'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material'

const YOU = 'ME'
const AI = 'AI'
function Chatgpt() {
  const inputRef = useRef()
  const [qna, setQna] = useState([])
  const [loading, setLoading] = useState(false)
  const [hint, setHint] = useState(false)
  const [hintData, setHintData] = useState()

  const updateQNA = (from, value) => {
    setQna((qna) => [...qna, { from, value }])
  }

  const handleSend = (ignoreHint) => {
    const question = inputRef.current.value
    updateQNA(YOU, question)
    setLoading(true)
    setHint(false)
    const params = {
      ignore_hint: ignoreHint,
    }
    axios
      .post(
        'http://localhost:5000/chatgpt?' +
          new URLSearchParams(params).toString(),
        {
          question,
        }
      )
      .then((response) => {
        if ('answer' in response.data) {
          console.log(response.data.answer)
          updateQNA(AI, response.data.answer)
        }
        if ('hint' in response.data) {
          console.log(response.data)
          setHintData(response.data)
          setHint(true)
        }
      })
      .catch((response) => {
        console.log(response.data)
        alert(response.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const renderContent = (qna) => {
    const value = qna.value

    if (Array.isArray(value)) {
      return value.map((v) => (
        <SyntaxHighlighter style={docco}>{v}</SyntaxHighlighter>
      ))
    }

    return <SyntaxHighlighter style={docco}>{value}</SyntaxHighlighter>
  }
  return (
    <main className='container'>
      <div className='other-options'>
        <Box sx={{ margin: '0 2rem', width: '15rem' }}>
          <FormControl
            fullWidth
            sx={{ background: '#fafafa', marginBottom: '2rem' }}
          >
            <InputLabel id='demo-simple-select-label' variant='filled'>
              Select Technology
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={100}
              label='Age'
              onChange={() => {}}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Stack direction='column' spacing={2}>
            <Button variant='contained'>Previously Searched</Button>
            <Button variant='contained'>Time Limit</Button>
            <Button variant='contained'>
              Fine Tuned based on customer requirements
            </Button>
          </Stack>
        </Box>
      </div>
      <div className='chat-input'>
        <input
          type='text'
          ref={inputRef}
          className='form-control col'
          placeholder='Type Something'
        />
        {hint ? (
          <>
            <button
              disabled={loading}
              className='btn btn-success'
              onClick={() => handleSend(true)}
            >
              Re-Send
            </button>
            <Suggestions
              setHint={setHint}
              handleSend={handleSend}
              hintData={hintData}
            />
          </>
        ) : (
          <button
            disabled={loading}
            className='btn btn-success'
            onClick={() => handleSend(false)}
          >
            Send
          </button>
        )}
      </div>
      <div className='chats'>
        {qna.map((qna) => {
          if (qna.from === YOU) {
            return (
              <div className='send chat'>
                <img
                  src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                  alt=''
                  className='avtar'
                />
                <p className='message-text'>{qna.value}</p>
              </div>
            )
          }
          return (
            <div className='recieve chat'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/9626/9626678.png'
                alt=''
                className='avtar'
              />
              <p className='message-text'>{renderContent(qna)}</p>
            </div>
          )
        })}

        {loading && (
          <div className='recieve chat'>
            <img
              src='https://cdn-icons-png.flaticon.com/512/9626/9626678.png'
              alt=''
              className='avtar'
            />
            <p>Typing...</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Chatgpt
