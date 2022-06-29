import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../axios"

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts', async () => {
    const { data } = await axios.get("/posts")
    return data
  }
)
export const fetchTags = createAsyncThunk(
  'posts/fetchTags', async () => {
    const { data } = await axios.get("/tags")
    return data
  }
)

const initialState = {
  posts: {
    itmes: [],
    status: "loading"
  },
  tags: {
    itmes: [],
    status: "loading"
  },
  viewsCount: 0,
  commentsCount: 0
}


export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading"
      state.posts.items = []
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload
      state.posts.status = "success"
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = "error"
      state.posts.items = []
    },
  },

})

export const {} = postsSlice.actions

export default postsSlice.reducer