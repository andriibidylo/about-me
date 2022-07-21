import React, { useCallback, useRef } from 'react';
import { IconButton, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import debounce from 'lodash.debounce'
import { setSearchValue } from '../../redux/filters/slice'
import { useDispatch } from 'react-redux'
import styles from './Search.module.scss';


export const Search = ({ setSearchText, searchText }) => {

  const searchRef = useRef(null)
  const dispatch = useDispatch()

  const memorizedSearchValue = useCallback(debounce(str => {
    dispatch(setSearchValue(str))
  }, 350), [])

  const onChangeInput = (text) => {
    setSearchText(text)
    memorizedSearchValue(text)
  }

  const clearSearchValue = () => {
    dispatch(setSearchValue(""))
    setSearchText("")
    searchRef.current?.focus()
  }


  return (
    <div className={styles.searchField} >
      <TextField onChange={(e) => onChangeInput(e.target.value)}
        value={searchText}
        className={styles.search}
        size="small"
        id="outlined-basic"
        label="Search..."
        variant="outlined"
        inputRef={searchRef}
        InputProps={{
          endAdornment: (
            <IconButton
              sx={{ visibility: searchText ? "visible" : "hidden" }}
              onClick={clearSearchValue}
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
        sx={{
          m: 2,
          "& .Mui-focused .MuiIconButton-root": { color: "primary.main" },
        }} />
    </div>
  )
}