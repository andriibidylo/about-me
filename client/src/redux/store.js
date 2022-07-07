import { configureStore } from '@reduxjs/toolkit'
import posts from './posts/slice'
import auth from './auth/slice'
import comments from './comments/slice'
import tags from './tags/slice'


export const store = configureStore({
  reducer: {
    posts,
    auth,
    comments,
    tags,
  },
}
)