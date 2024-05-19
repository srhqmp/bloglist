import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../reducers/blogReducer.js'
import { displayMessage } from '../reducers/notificationReducer.js'
import { useParams } from 'react-router-dom'

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
      <form onSubmit={handleNewComment}>
        <input
          id="comment-input"
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

export default CommentForm
