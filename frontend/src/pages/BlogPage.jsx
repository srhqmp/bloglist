import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Card,
  Box,
  CardContent,
  Grid,
  Button,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
} from '@mui/material'
import {
  ThumbUpAltOutlined as ThumbUpIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
} from '@mui/icons-material'

import { likeBlog } from '../reducers/blogReducer.js'

import CommentForm from '../components/CommentForm.jsx'

const BlogPage = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  return (
    <Container>
      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => navigate('/')}
      >
        View all blogs
      </Button>
      <Box sx={{ my: 2 }}>
        <Typography variant="h5" color="secondary">
          {blog.title}
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography component="a" href={blog.url}>
                <em>{blog.url}</em>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>{blog.likes} likes</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                added by <strong>{blog.user.name}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => dispatch(likeBlog(blog))}
                startIcon={<ThumbUpIcon />}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              >
                like this blog
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ my: 2 }}>
        <CardContent>
          <Grid container gap={1}>
            <Grid item xs={12}>
              <CommentForm />
            </Grid>
            <Grid item xs={12}>
              <Typography color="secondary" gutterBottom>
                Comments:
              </Typography>
              {blog.comments.length ? (
                <List sx={{ width: '100%', maxWidth: 360 }}>
                  {blog.comments.map((comment, index) => (
                    <ListItem disablePadding key={`${comment}-${index}`}>
                      <ListItemIcon>
                        <KeyboardArrowRightIcon />
                      </ListItemIcon>
                      <ListItemText primary={comment} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No comments at this moment</Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}

export default BlogPage
