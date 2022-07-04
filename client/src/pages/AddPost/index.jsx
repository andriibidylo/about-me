import React, { useState, useCallback, useMemo, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from "react-router";
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectAuth } from "../../redux/auth/selectors"
import axios from "../../axios"


export const AddPost = () => {

  const naviagate = useNavigate()
  const inputFileRef = useRef()
  const [isLoading, setIsLoading] = useState(false)

  const [imageUrl, setImageUrl] = useState("")

  const { data } = useSelector(selectAuth)

  const [text, setText] = useState("");
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append("image", file)
      console.log(formData)
      const { data } = await axios.post("/upload", formData)
      console.log(data)
      setImageUrl(data.url)
    } catch (error) {
      console.log(error)
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const fieldsData = {
        imageUrl,
        text,
        title,
        tags: tags.split(",")
      }
      const { data } = await axios.post("/posts", fieldsData)
      const id = data._id
      naviagate(`/posts/${id}`)

    } catch (error) {
      console.log(error)
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl("")
  };

  
  const onChange = useCallback((text) => {
    setText(text);
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


  if (!window.localStorage.getItem("token") && !Boolean(data)) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Upload preview
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Remove
          </Button>
          <img className={styles.image} src={`http://localhost:8000${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Tags" value={tags}
        onChange={(e) => setTags(e.target.value)} fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={() => onSubmit()} size="large" variant="contained">
          Publish
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};