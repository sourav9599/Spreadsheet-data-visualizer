import * as React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea } from '@mui/material'
import data from './code-apps.json'
import { Link } from 'react-router-dom'
import { Stack } from '@mui/system'

export default function ActionAreaCard() {
  return (
    <Stack
      sx={{
        margin: '5em',
      }}
      spacing={5}
    >
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((tool, idx) => {
          return (
            <Grid item key={idx} xs={2} sm={4} md={4}>
              <Card
                sx={{ maxWidth: '23rem', height: '100%', margin: '0 auto' }}
              >
                <CardActionArea component={Link} to='/code/chatgpt'>
                  <CardMedia
                    component='img'
                    height='140'
                    image={tool.image_path}
                    alt={tool.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {tool.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {tool.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Button
        variant='contained'
        sx={{
          width: 'fit-content',
          padding: '10px 30px',
          justifySelf: 'center',
          alignSelf: 'center',
        }}
      >
        Explore Other Options
      </Button>
    </Stack>
  )
}
