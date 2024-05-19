import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Paper, Typography, Box, Grid, TextField } from '@mui/material'

const BlogForm = forwardRef(({ handleSubmit }, refs) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const resetForm = () => {
    setBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  useImperativeHandle(refs, () => {
    return { resetForm }
  })

  const handleNewBlog = (event) => {
    event.preventDefault()
    handleSubmit(blog)
  }

  return (
    <Paper elevation={3} sx={{ mt: 2, py: 1, px: 1, maxWidth: 600 }}>
      <Box mb={2}>
        <Typography variant="h6" color="secondary">
          Create new blog
        </Typography>
      </Box>
      <Box component="form" noValidate onSubmit={handleNewBlog}>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              size="small"
              label="Title"
              id="title-input"
              name="title"
              value={blog.title}
              onChange={(event) =>
                setBlog((curr) => ({ ...curr, title: event.target.value }))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              size="small"
              label="Author"
              id="author-input"
              name="author"
              value={blog.author}
              onChange={(event) =>
                setBlog((curr) => ({ ...curr, author: event.target.value }))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              size="small"
              label="Url"
              id="url-input"
              name="url"
              value={blog.url}
              onChange={(event) =>
                setBlog((curr) => ({ ...curr, url: event.target.value }))
              }
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              create
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
})

BlogForm.displayName = 'BlogForm'

export default BlogForm
