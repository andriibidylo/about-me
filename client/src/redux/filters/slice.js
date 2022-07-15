import { createSlice, PayloadAction } from '@reduxjs/toolkit'



const initialState= {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: "popular", sortProperty: "rating"
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload
    },
    setSortType: (state, action) => {
      state.sortType = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setFilters: (state, action) => {
      state.sortType = action.payload.sortType
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
    }
  },
})


export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer