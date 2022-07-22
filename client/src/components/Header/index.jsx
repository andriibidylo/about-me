import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import { Link } from "react-router-dom"
import styles from './Header.module.scss';
import { selectAuth } from "../../redux/auth/selectors"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../../redux/auth/slice";
import { UserInfo } from '../UserInfo';
import { useNavigate } from "react-router"
import { setDefaultSearchValues } from '../../redux/filters/slice'
import { Search } from '../Search/index'


export const Header = () => {

  const [searchText, setSearchText] = useState("")
  const naviagate = useNavigate()
  const dispatch = useDispatch()
  const { authorizedUser } = useSelector(selectAuth)
  const isAuth = Boolean(authorizedUser)

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
          <Search setSearchText={setSearchText} searchText={searchText} se />
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