import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../axios"

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData', async (params) => {
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
    [fetchUserData.pending]: (state) => {
      state.status = "loading"
      state.data = null
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = "success"
    },
    [fetchUserData.rejected]: (state) => {
      state.status = "error"
      state.data = null
    },
  }
})

export const { } = authSlice.actions

export default authSlice.reducer