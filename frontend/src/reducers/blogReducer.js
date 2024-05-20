import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { displayMessage } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    updateBlog(state, action) {
      const id = action.payload.id
      const blogToUpdate = state.find((b) => b.id === id)
      const updatedBlog = {
        ...blogToUpdate,
        likes: action.payload.likes,
        comments: action.payload.comments || [],
      }
      return state.map((b) => (b.id === id ? updatedBlog : b))
    },
    removeBlog(state, action) {
      const id = action.payload.id
      return state.filter((b) => b.id !== id)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (data) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create({
        title: data.title,
        author: data.author,
        url: data.url,
      })
      console.log({ newBlog })
      dispatch(appendBlog(newBlog))
      dispatch(
        displayMessage(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          'success'
        )
      )
    } catch (err) {
      console.error(err)
      dispatch(displayMessage(err.response.data.error, 'error'))
    }
  }
}

export const likeBlog = (data) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.updateOne(data.id, {
        title: data.title,
        author: data.author,
        url: data.url,
        likes: data.likes + 1,
      })
      dispatch(updateBlog(updatedBlog))
    } catch (err) {
      console.error(err)
      dispatch(displayMessage(err.response.data.error, 'error'))
    }
  }
}

export const addComment = (data) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.comment(data.id, data.comment)
      dispatch(updateBlog(updatedBlog))
    } catch (err) {
      console.error(err)
      dispatch(displayMessage(err.response.data.error, 'error'))
    }
  }
}

export const deleteBlog = (data) => {
  return async (dispatch) => {
    try {
      await blogService.deleteOne(data.id)
      dispatch(removeBlog({ id: data.id }))
      dispatch(
        displayMessage(
          `You've successfully removed ${data.title} by ${data.author}`,
          'success'
        )
      )
      return { redirect: true }
    } catch (err) {
      console.error(err)
      dispatch(displayMessage(err.response.data.error, 'error'))
    }
  }
}

export default blogSlice.reducer
