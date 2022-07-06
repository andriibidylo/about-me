import React from "react";

import styles from "./AddComment.module.scss";
import { useSelector } from 'react-redux'
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = () => {
  const { data } = useSelector(state => state.auth)

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={data ? data.avatarUrl : ""}
        />
        <div className={styles.form}>
          <TextField
            label="Add comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained">Send</Button>
        </div>
      </div>
    </>
  );
};