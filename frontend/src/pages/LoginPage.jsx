import { useState } from 'react'
import { Container, Typography } from '@mui/material'
import LoginForm from '../components/LoginForm.jsx'
import SignupForm from '../components/SignupForm.jsx'

const LoginPage = () => {
  const [newUser, setNewUser] = useState(false)

  const handleNewUser = (isNew) => {
    setNewUser(isNew)
  }

  return (
    <Container>
      <Typography variant="h3" color="secondary">
        {newUser ? 'Sign Up' : 'Login'}
      </Typography>
      {newUser ? (
        <SignupForm handleNewUser={handleNewUser} />
      ) : (
        <LoginForm handleNewUser={handleNewUser} />
      )}
    </Container>
  )
}

export default LoginPage
