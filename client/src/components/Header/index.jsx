import React from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {selectAuth} from "../../redux/auth/selectors"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../../redux/auth/slice";


export const Header = () => {

  const { data } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const isAuth = Boolean(data)
  const onClickLogout = () => {
    dispatch(logout())
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ABOUT ME APP</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts/create">
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
                  <Button onClick={()=>dispatch(logout())}  variant="contained">Create an account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};