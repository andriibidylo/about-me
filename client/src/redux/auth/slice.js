import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../axios"


export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData', async (params) => {
    const { data } = await axios.post("/auth/login", params)
    return data
  }
)
export const fetchIsAuthMe = createAsyncThunk(
  'auth/fetchIsAuthMe', async () => {
    const { data } = await axios.get("/auth/me")
    return data
  }
)
export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister', async (params) => {
    const { data } = await axios.post("/auth/register", params)
    return data
  }
)

const initialState = {
  authorizedUser: null,
  status: "loading",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.authorizedUser = null
    }
  },
  extraReducers: {
    [fetchAuthData.pending]: (state) => {
      state.status = "loading"
      state.authorizedUser = null
    },
    [fetchAuthData.fulfilled]: (state, action) => {
      state.authorizedUser = action.payload
      state.status = "success"
    },
    [fetchIsAuthMe.rejected]: (state) => {
      state.status = "error"
      state.authorizedUser = null
    },
    [fetchIsAuthMe.pending]: (state) => {
      state.status = "loading"
      state.authorizedUser = null
    },
    [fetchIsAuthMe.fulfilled]: (state, action) => {
      state.authorizedUser = action.payload
      state.status = "success"
    },
    [fetchAuthData.rejected]: (state) => {
      state.status = "error"
      state.authorizedUser = null
    },
    [fetchRegister.pending]: (state) => {
      state.status = "loading"
      state.authorizedUser = []
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.authorizedUser = action.payload
      state.status = "success"
    },
    [fetchRegister.rejected]: (state) => {
      state.status = "error"
      state.authorizedUser = []
    },
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer