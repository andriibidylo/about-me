import React from "react";
import styles from "./AddComment.module.scss";
import { useSelector } from 'react-redux'
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";


export const AddComment = ({ onSubmit, setText, text}) => {
 
  const { authorizedUser } = useSelector(state => state.auth)

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={authorizedUser ? authorizedUser.avatarUrl : ""}
        />
        <div className={styles.form}>
          <TextField
            label="Add a comment..."
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={onSubmit} variant="contained">Send</Button>
        </div>
      </div>
    </>
  );
};