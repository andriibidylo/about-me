import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  searchValue: "",
  sortByTag: "",
  sortByPopular: 0,
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
    setDefaultSearchValues: (state) => {
      state.sortByTag = ""
      state.searchValue = ""
      state.sortByPopular = 0
    }
  },
})


export const { setSearchValue, setSortByTag, setSortByPopular, setDefaultSearchValues } = filterSlice.actions

export default filterSlice.reducer