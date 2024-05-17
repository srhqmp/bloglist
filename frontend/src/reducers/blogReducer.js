import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
      const updatedBlog = { ...blogToUpdate, likes: action.payload.likes }
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
    const newBlog = await blogService.create({
      title: data.title,
      author: data.author,
      url: data.url,
    })
    console.log({ newBlog })
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (data) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateOne(data.id, {
      title: data.title,
      author: data.author,
      url: data.url,
      likes: data.likes + 1,
    })
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteOne(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer
