import React,{useState,useCallback,useMemo} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from "react-router";
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectAuth } from "../../redux/auth/selectors"

export const AddPost = () => {


  const { data } = useSelector(selectAuth)
  

  const imageUrl = "";
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")

  const handleChangeFile = () => {};

  const onClickRemoveImage = () => {};

  const onChange = useCallback((value) => {
    setValue(value);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Type something...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );


  if (!window.localStorage.getItem("token") && !Boolean(data)){
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large">
        Upload preview
      </Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Remove
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:8000${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title"
        fullWidth
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Tags" value={tags}
        onChange={(e)=> setTags(e.target.value)} fullWidth />
      <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained">
          Publish
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};