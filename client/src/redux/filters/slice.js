import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  searchValue: "",
  sortByTag: "",
  sortByPopular: false,
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setSortByTag: (state, action) => {
      state.sortByTag = action.payload
    },
    setSortByPopular: (state, action) => {
      state.sortByPopular = action.payload
    },
  },
})


export const { setSearchValue, setSortByTag, setSortByPopular } = filterSlice.actions

export default filterSlice.reducer