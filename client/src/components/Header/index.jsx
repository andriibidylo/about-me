import React, { useState, useCallback, useRef } from 'react';
import { Button, IconButton, TextField, Container } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from "react-router-dom"
import styles from './Header.module.scss';
import { selectAuth } from "../../redux/auth/selectors"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../../redux/auth/slice";
import { UserInfo } from '../UserInfo';
import { useNavigate } from "react-router"
import debounce from 'lodash.debounce'
import { setSearchValue, setDefaultSearchValues } from '../../redux/filters/slice'



export const Header = () => {

  const searchRef = useRef(null)
  const [searchText, setSearchText] = useState("")
  const naviagate = useNavigate()
  const dispatch = useDispatch()
  const { authorizedUser } = useSelector(selectAuth)
  const isAuth = Boolean(authorizedUser)


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

  const onClickLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem("token")
  };

  const onClickLogo = () => {
    dispatch(setDefaultSearchValues())
    setSearchText("")
    naviagate("/")
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <div onClick={onClickLogo} className={styles.logo} >
            <div>ABOUT ME APP</div>
          </div>
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
          <div className={styles.inner}>
            {isAuth && <UserInfo {...authorizedUser} />}
            <div className={styles.buttons}>
              {isAuth ? (
                <>
                  <Link to="/add-post">
                    <Button variant="contained">Add post</Button>
                  </Link>
                  <Button onClick={onClickLogout} variant="contained" color="error">
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outlined">Log in</Button>
                  </Link>
                  <Link to="/registration">
                    <Button onClick={() => dispatch(logout())} variant="contained">Create an account</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};