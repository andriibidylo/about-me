import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../axios"


export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts', async ({ searchValue, sortByTag, sortByPopular, currentPage }) => {
    const title = searchValue ? `&title=${searchValue}` : ""
    const tags = sortByTag ? `&tags=${sortByTag}` : ""
    const { data } = await axios.get(`/posts?popular=${Boolean(sortByPopular)}${title}${tags}&page=${currentPage}`)

    return data
  }
)

export const removePost = createAsyncThunk(
  'posts/removePost', async (id) => {
    const { data } = await axios.delete(`/posts/${id}`)
    return data
  }
)

const initialState = {
  posts: {
    items: [],
    status: "loading"
  },
  totalPages: 1,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading"
      state.posts.items = []
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload.docs
      state.totalPages = action.payload.totalPages
      state.posts.status = "success"
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = "error"
      state.posts.items = []
    },
    [removePost.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter((item) => item._id !== action.meta.arg)
    },

  },
})

export default postsSlice.reducer