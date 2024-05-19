import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Card, Typography } from '@mui/material'

const ProfilePage = () => {
  const user = useSelector((state) => state.user)

  if (!user) {
    return null
  }

  return (
    <Container>
      <Typography variant="h3" color="secondary" sx={{ mb: 2 }}>
        {user.name}
      </Typography>
      <Card sx={{ p: 4 }}>
        <Typography>
          username: <strong>{user.username}</strong>
        </Typography>
      </Card>
    </Container>
  )
}

export default ProfilePage
