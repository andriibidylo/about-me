import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { selectAuth } from "../../redux/auth/selectors"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../../redux/auth/slice";
import { UserInfo } from '../UserInfo';
import { useNavigate } from "react-router"
import { fetchPosts } from "../../redux/posts/slice"
import TextField from "@mui/material/TextField";
import axios from "../../axios"


export const Header = () => {

  const [searchText, setSearchText] = useState("")
  const onClickSearch = async (searchText) => {
try {
  await axios.get('')
} catch (error) {
  console.log(error)
}
  }
  const naviagate = useNavigate()
  const dispatch = useDispatch()
  const { authorizedUser } = useSelector(selectAuth)
  const isAuth = Boolean(authorizedUser)

  const onClickLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem("token")
  };
  const onClickLogo = () => {
    dispatch(fetchPosts())
    naviagate("/")
  }
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <div onClick={onClickLogo} className={styles.logo} >
            <div>ABOUT ME APP</div>
          </div>
          <div >
            <TextField onChange={(e) => setSearchText(e.target.value)} value={searchText} className={styles.search} size="small" id="outlined-basic" label="Search..." variant="outlined" />
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