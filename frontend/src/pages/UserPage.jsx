import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  Card,
  Typography,
  CardContent,
  CardHeader,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Button,
} from '@mui/material'
import {
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
} from '@mui/icons-material'

const UserPage = ({ user }) => {
  const navigate = useNavigate()
  if (!user) return <div>User Not Found</div>

  return (
    <Container>
      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => navigate('/users')}
      >
        View all users
      </Button>
      <Typography variant="h3" color="secondary" sx={{ mb: 2 }}>
        {user.name}
      </Typography>
      <Card>
        <CardHeader
          title={<Typography color="secondary">Added Blogs:</Typography>}
        />
        <CardContent>
          {user.blogs.length ? (
            <List sx={{ width: '100%', maxWidth: 360 }}>
              {user.blogs.map((blog) => (
                <ListItem disablePadding key={blog.id}>
                  <ListItemIcon>
                    <KeyboardArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        component={Link}
                        color="secondary"
                        to={`/blogs/${blog.id}`}
                      >
                        {blog.title}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>There are no blogs yet</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default UserPage
