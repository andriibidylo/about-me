import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../axios"


export const fetchTags = createAsyncThunk(
  'tags/fetchTags', async () => {
    const { data } = await axios.get("/tags")
    return data
  }
)

const initialState = {
  tags: {
    items: [],
    status: "loading"
  }
}

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
  },
  extraReducers: {
   
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
    
  },
})
export default tagsSlice.reducer