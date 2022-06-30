import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../axios"

export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData', async (params) => {
    const { data } = await axios.post("/auth/login", params)
    return data
  }
)

const initialState = {
  data: null,
  status: "loading",
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAuthData.pending]: (state) => {
      state.status = "loading"
      state.data = null
    },
    [fetchAuthData.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = "success"
    },
    [fetchAuthData.rejected]: (state) => {
      state.status = "error"
      state.data = null
    },
  }
})

export const { } = authSlice.actions

export default authSlice.reducer