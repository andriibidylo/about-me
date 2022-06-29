import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import posts from './posts/slice'

export const store = configureStore({
  reducer: {
    posts,
  },
})
