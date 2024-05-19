import { createSlice } from '@reduxjs/toolkit'

import { logoutUser } from './userReducer'

const initialState = { message: '', variant: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const resetNotification = (time) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export const displayMessage = (message, variant) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, variant }))
    dispatch(resetNotification(5))
    if (variant === 'error' && message.includes('token')) {
      dispatch(logoutUser())
    }
  }
}

export default notificationSlice.reducer
