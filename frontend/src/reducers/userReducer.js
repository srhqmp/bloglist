import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login.js'
import blogService from '../services/blogs.js'

import { displayMessage } from './notificationReducer.js'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const data = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(data))
      dispatch(setUser(data))
      blogService.setToken(data.token)
      dispatch(displayMessage(`Welcome back ${data.name}!`, 'success'))
    } catch (err) {
      console.error(err)
      dispatch(displayMessage(err.response.data.error, 'error'))
    }
  }
}

export const updateUser = () => {
  return async (dispatch) => {
    const user = window.localStorage.getItem('loggedBlogUser')
    if (user) {
      const userJSON = JSON.parse(user)
      dispatch(setUser(userJSON))
      blogService.setToken(userJSON.token)
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(removeUser())
  }
}

export default userSlice.reducer
