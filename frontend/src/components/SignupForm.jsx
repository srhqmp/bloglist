import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Grid, Button, Paper, Box, TextField } from '@mui/material'

import { createUser } from '../reducers/userReducer.js'

const SignupForm = ({ handleNewUser }) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(createUser({ username, name, password }))
    setUsername('')
    setName('')
    setPassword('')
  }

  return (
    <Paper elevation={3} sx={{ my: 2, py: 4, px: 4 }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <Grid container gap={2}>
          <Grid item xs={12}>
            <TextField
              required
              label="Username"
              variant="outlined"
              name="username"
              autoComplete="off"
              value={username}
              inputProps={{
                autoComplete: 'new-username',
                form: {
                  autoComplete: 'off',
                },
              }}
              fullWidth
              onChange={({ target }) => setUsername(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Name"
              variant="outlined"
              autoComplete="off"
              name="name"
              value={name}
              inputProps={{
                autoComplete: 'new-name',
                form: {
                  autoComplete: 'off',
                },
              }}
              fullWidth
              onChange={({ target }) => setName(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Password"
              variant="outlined"
              autoComplete="off"
              name="password"
              value={password}
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
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
              Create Account
            </Button>
            <Button
              onClick={() => {
                handleNewUser(false)
              }}
            >
              Login Instead
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default SignupForm
