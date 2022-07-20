import React, { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { selectAuth } from "../../redux/auth/selectors"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../../redux/auth/slice";
import { UserInfo } from '../UserInfo';
import { useNavigate } from "react-router"
import TextField from "@mui/material/TextField";
import debounce from 'lodash.debounce'
import { setSearchValue, setDefaultSearchValues  } from '../../redux/filters/slice'


export const Header = () => {

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
  }

  const onClickLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem("token")
  };

  const onClickLogo = () => {
    dispatch(setDefaultSearchValues())
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
            <TextField onChange={(e) => onChangeInput(e.target.value)} value={searchText} className={styles.search} size="small" id="outlined-basic" label="Search..." variant="outlined" />
            {searchText && <svg
              className={styles.clearIcon}
              onClick={() => clearSearchValue()}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>}
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