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
  },
})

export const { setBlogs, appendBlog } = blogSlice.actions

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

export default blogSlice.reducer
