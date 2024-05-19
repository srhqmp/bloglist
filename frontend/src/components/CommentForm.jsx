import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Paper, Typography, Box, Grid, TextField } from '@mui/material'

import { addComment } from '../reducers/blogReducer.js'
import { displayMessage } from '../reducers/notificationReducer.js'

const CommentForm = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [comment, setComment] = useState('')

  const handleNewComment = (event) => {
    event.preventDefault()
    if (!comment) {
      return dispatch(displayMessage('Comment must not be empty', 'error'))
    }
    dispatch(addComment({ id, comment }))
    setComment('')
  }

  if (!user) {
    return null
  }

  return (
    <div className="comment-form">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleNewComment}
      >
        <Grid container gap={1}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              size="small"
              label="Comment"
              id="comment-input"
              rows={4}
              name="comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="outlined" size="small">
              add comment
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default CommentForm
