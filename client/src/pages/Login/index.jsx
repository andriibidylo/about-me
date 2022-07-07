import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from 'react-redux'
import styles from "./Login.module.scss";
import { fetchAuthData } from "../../redux/auth/slice"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router";
import { selectAuth } from "../../redux/auth/selectors"

export const Login = () => {

  const { authorizedUser } = useSelector(selectAuth)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange"
  })
  const dispatch = useDispatch()


  // Send axios request with email and password 
  const onSubmit = async (value) => {
    const data = await dispatch(fetchAuthData(value))

    // Set token to localStorage
    if (!data.payload) {
      return alert("Please authorize")
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token)
    }
  }

  // If user authorized navigate them to Home page
  if (Boolean(authorizedUser)) {
    return <Navigate to="/" />;
  }

  return (
    <Paper elevation={0} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Log in
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          type="email"
          {...register("email", { required: "Please enter an email" })}

        />
        <TextField
          className={styles.field}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          label="Password"
          {...register("password", { required: "Please enter a password" })}
          fullWidth />
        <Button size="large" variant="contained" type="submit" fullWidth>
          Log in
        </Button>
      </form>
    </Paper>
  );
};