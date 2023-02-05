import React from 'react'
import styled from 'styled-components'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]

const FilterOptions = () => {
  const [personName, setPersonName] = React.useState([])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }
  return (
    <Wrapper>
      <h2>FilterOptions</h2>

      <div className='btn-group'>
        <button className='btn option-one'>Filter Options</button>
        <button className='btn option-two'>Filter Options</button>
        <button className='btn'>Filter Options</button>
        <div className='form-control'>
          <FormControl sx={{ m: 0, width: '10rem' }}>
            <InputLabel id='demo-multiple-name-label'>Name</InputLabel>
            <Select
              labelId='demo-multiple-name-label'
              id='demo-multiple-name'
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label='Name' />}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background-color: #fafafa;
  padding: 2rem;

  .btn-group {
    display: grid;
    margin-top: 2rem;
    /* gap: 1rem; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    justify-content: space-between;
    justify-items: start;

    gap: 1rem;
  }

  .option-one {
    width: 100%;
    grid-column: 1/3;
    gird-row: 1/2;
  }

  .option-two {
    width: 100%;
    grid-column: 1/3;
    grid-row: 2/3;
  }

  .filter-text {
    border: none;
    background: transparent;
    border-bottom: 2px solid black;
  }

  .btn {
    background: transparent;
    border: none;

    background-color: #f08080;
    padding: 10px 10px;
    border-radius: 5px;

    font-family: 'Ubuntu', sans-serif;
    font-weight: 700;

    color: #471515;
    cursor: pointer;
  }

  .btn:hover {
    background-color: #f36666;
  }
`

export default FilterOptions
