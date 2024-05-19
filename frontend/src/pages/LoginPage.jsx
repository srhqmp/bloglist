import { Container, Typography } from '@mui/material'
import LoginForm from '../components/LoginForm.jsx'

const LoginPage = () => {
  return (
    <Container>
      <Typography variant="h3">Login</Typography>
      <LoginForm />
    </Container>
  )
}

export default LoginPage
