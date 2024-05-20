import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  IconButton,
  CardHeader,
} from '@mui/material'
import {
  ThumbUpAltOutlined as ThumbUpIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material'

import { likeBlog, deleteBlog } from '../reducers/blogReducer.js'

import CommentForm from '../components/CommentForm.jsx'
import WarningModal from '../components/WarningModal.jsx'

const BlogPage = ({ blog }) => {
  const [open, setOpen] = useState(false)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const isAuthor = user && user.id === blog.user.id

  const handleDelete = () => {
    dispatch(deleteBlog(blog))
    navigate('/')
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
      <Card>
        <CardHeader
          title={
            <Typography color="secondary" variant="h4">
              {blog.title}
            </Typography>
          }
          action={
            isAuthor ? (
              <IconButton
                aria-label="delete-blog"
                onClick={() => setOpen(true)}
              >
                <DeleteOutlineIcon color="secondary" />
              </IconButton>
            ) : null
          }
        />
        <CardContent>
          <WarningModal
            open={open}
            setOpen={setOpen}
            message="Are you sure you want to delete this blog?"
            handleAction={handleDelete}
          />
          <Grid container>
            <Grid item xs={12}>
              <strong>url:</strong>{' '}
              <Typography
                component={Link}
                target="_blank"
                color="secondary"
                to={blog.url}
              >
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
