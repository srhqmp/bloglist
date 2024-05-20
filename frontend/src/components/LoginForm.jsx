import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Grid, Button, Paper, Box, TextField } from '@mui/material'

import { loginUser } from '../reducers/userReducer.js'

const LoginForm = ({ handleNewUser }) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <Paper elevation={3} sx={{ my: 2, py: 4, px: 4 }}>
      <Box component="form" noValidate onSubmit={handleLogin}>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <TextField
              required
              label="Username"
              variant="outlined"
              name="username"
              value={username}
              fullWidth
              onChange={({ target }) => setUsername(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Password"
              variant="outlined"
              name="password"
              value={password}
              type="password"
              fullWidth
              onChange={({ target }) => setPassword(target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button type="submit" size="small" variant="contained">
              login
            </Button>
            <Button onClick={() => handleNewUser(true)}>Create Account</Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default LoginForm
