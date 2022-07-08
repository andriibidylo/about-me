import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../axios"

export const fetchAllComments = createAsyncThunk(
  'comments/fetchAllComments', async () => {
    const { data } = await axios.get("/comments")
    return data
  }
)
export const removeComment = createAsyncThunk(
  "comments/removeComment", async (id) => {
    const { data } = await axios.delete(`/comments/${id}`)
    return data
  }
)

const initialState = {
  allComments: {
    items: [],
    status: "loading"
  }
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
  },
  extraReducers: {

    [fetchAllComments.pending]: (state) => {
      state.allComments.status = "loading"
      state.allComments.items = []
    },
    [fetchAllComments.fulfilled]: (state, action) => {
      state.allComments.items = action.payload
      state.allComments.status = "success"
    },
    [fetchAllComments.rejected]: (state) => {
      state.allComments.status = "error"
      state.allComments.items = []
    },
    [removeComment.fulfilled]: (state, action) => {
      state.allComments.items = state.allComments.items.filter((item) => item._id !== action.meta.arg)
    },
  },
})

export default commentsSlice.reducer