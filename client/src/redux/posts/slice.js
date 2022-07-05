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

export const removePost = createAsyncThunk(
  'posts/removePost', async (id) => await axios.delete(`/posts/${id}`)
)

const initialState = {
  posts: {
    items: [],
    status: "loading"
  },
  tags: {
    items: [],
    status: "loading"
  },
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
    [fetchTags.pending]: (state) => {
      state.tags.status = "loading"
      state.tags.items = []
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload
      state.tags.status = "success"
    },
    [fetchTags.rejected]: (state) => {
      state.tags.status = "error"
      state.tags.items = []
    },
    [removePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((item) => item._id !== action.meta.arg)
    },
  },
})

export default postsSlice.reducer