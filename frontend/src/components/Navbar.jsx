import { AppBar, Box, Button, IconButton, Stack, Toolbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/logo.svg'

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Box display='flex' justifyContent='center'>
        <Toolbar>
          <Stack minWidth='80vw' direction='row' justifyContent='space-between'>
            <Link to='/'>
              <img src={logo} alt='logo' />
            </Link>
            <Stack direction='row' spacing={2}>
              <Link
                to='/'
                style={{ textDecoration: 'none', color: 'var(--white)' }}
              >
                <Button variant='inherit'>Home</Button>
              </Link>
              <Link
                to='/upload'
                style={{ textDecoration: 'none', color: 'var(--white)' }}
              >
                <Button variant='inherit'>Tool</Button>
              </Link>
              <Button color='inherit'>About</Button>
              <Button color='inherit'>Login</Button>
            </Stack>
          </Stack>
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default Navbar
