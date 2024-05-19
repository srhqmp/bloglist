import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Button, Paper, Box, TextField } from '@mui/material'

import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
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
    <Paper elevation={3} sx={{ mt: 2, py: 4, px: 4 }}>
      <Box component="form" noValidate onSubmit={handleLogin}>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <TextField
              required
              label="Username"
              variant="filled"
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
              variant="filled"
              name="password"
              value={password}
              type="password"
              fullWidth
              onChange={({ target }) => setPassword(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" size="large" variant="contained">
              login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default LoginForm
