import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  Card,
  Typography,
  CardContent,
  CardHeader,
  List,
  ListItemText,
  ListItem,
  Button,
  Divider,
} from '@mui/material'
import { KeyboardBackspace as KeyboardBackspaceIcon } from '@mui/icons-material'

import { formatTimeAgo } from '../utils'

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
          title={
            <Typography color="primary" variant="h5">
              Added Blogs
            </Typography>
          }
        />
        <CardContent>
          <Divider />
          {user.blogs.length ? (
            <List sx={{ width: '100%' }}>
              {user.blogs.map((blog) => (
                <Link key={blog.id} to={`/blogs/${blog.id}`}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography color="secondary">{blog.title}</Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="primary">
                          created {formatTimeAgo(blog?.createdAt)}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider />
                </Link>
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
