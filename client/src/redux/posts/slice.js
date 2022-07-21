import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../axios"


export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts', async ({ searchValue, sortByTag, sortByPopular }) => {
    const title = searchValue ? `&title=${searchValue}` : ""
    const tags = sortByTag ? `&tags=${sortByTag}` : ""
    const { data } = await axios.get(`/posts?popular=${Boolean(sortByPopular)}${title}${tags}`)

    return data
  }
)

export const fetchPostsByPopular = createAsyncThunk(
  'posts/fetchPostsByPopular', async () => {
    const { data } = await axios.get(`/posts/popular`)
    return data
  }
)
export const fetchPostsByTag = createAsyncThunk(
  'posts/fetchPostsByTag', async (tag) => {
    const { data } = await axios.get(`/posts/tags/${tag}`)
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
      state.posts.items = action.payload
      state.posts.status = "success"
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = "error"
      state.posts.items = []
    },
    [fetchPostsByPopular.pending]: (state) => {
      state.posts.status = "loading"
      state.posts.items = []
    },
    [fetchPostsByPopular.fulfilled]: (state, action) => {
      state.posts.items = action.payload
      state.posts.status = "success"
    },
    [fetchPostsByPopular.rejected]: (state) => {
      state.posts.status = "error"
      state.posts.items = []
    },
    [fetchPostsByTag.pending]: (state) => {
      state.posts.status = "loading"
      state.posts.items = []
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload
      state.posts.status = "success"
    },
    [fetchPostsByTag.rejected]: (state) => {
      state.posts.status = "error"
      state.posts.items = []
    },
    [removePost.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter((item) => item._id !== action.meta.arg)
    },
  },
})

export default postsSlice.reducer