import { Typography, Container } from '@mui/material'

const NotFoundPage = () => {
  return (
    <Container>
      <Typography variant="h3" color="secondary" sx={{ mb: 2 }}>
        404 - Not Found
      </Typography>
      <Typography color="primary">
        The page you are looking for does not exist.
      </Typography>
    </Container>
  )
}

export default NotFoundPage
