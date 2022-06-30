import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import posts from './posts/slice'
import auth from './auth/slice'

export const store = configureStore({
  reducer: {
    posts,
    auth,
  },
}
)