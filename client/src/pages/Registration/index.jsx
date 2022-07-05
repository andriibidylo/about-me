import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form"
import { Navigate } from "react-router";
import styles from './Registration.module.scss';
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegister } from '../../redux/auth/slice'
import { selectAuth } from "../../redux/auth/selectors"


export const Registration = () => {

  const { data } = useSelector(selectAuth)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange"
  })
  const dispatch = useDispatch()


  // Send axios request with email and password 
  const onSubmit = async (value) => {
    console.log(value)
    const data = await dispatch(fetchRegister(value))

    // Set token to localStorage
    if (!data.payload) {
      return alert("Please authorize")
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token)
    }
  }

  // If user authorized navigate them to Home page
  if (Boolean(data)) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create an account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Full name"
          type="fullName"
          {...register("fullName", { required: "Please enter a full name" })}
          fullWidth />
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          {...register("email", { required: "Please enter an email" })}
          fullWidth />
        <TextField className={styles.field} label="Password"
          type="password"
          {...register("password", { required: "Please enter a password" })}
          fullWidth />
        <Button size="large" variant="contained" type="submit" fullWidth>
          Registration
        </Button>
      </form>
    </Paper>
  );
};