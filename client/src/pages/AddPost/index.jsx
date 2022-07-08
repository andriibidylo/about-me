import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux'
import { useParams, useNavigate, Navigate } from "react-router";
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectAuth } from "../../redux/auth/selectors"
import axios from "../../axios"


export const AddPost = () => {

  const { id } = useParams()
  const naviagate = useNavigate()
  const inputFileRef = useRef()
  const isEditing = Boolean(id)

  const { authorizedUser } = useSelector(selectAuth)

  const [imageUrl, setImageUrl] = useState("")
  const [text, setText] = useState("");
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append("image", file)
      const { data } = await axios.post("/upload", formData)
      setImageUrl(data.url)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const getPostForEdit = async () => {
      try {
        if (id) {
          const { data } = await axios.get(`/posts/${id}`)
          setText(data.text)
          setTitle(data.title)
          setTags(data.tags.join(','))
          setImageUrl(data.imageUrl)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getPostForEdit()
  }, [])

  const onSubmit = async () => {
    try {
      const fieldsData = {
        imageUrl,
        text,
        title,
        tags,
      }
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fieldsData)
        : await axios.post("/posts", fieldsData)

      const _id = isEditing ? id : data._id
      naviagate(`/posts/${_id}`)

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


  if (!window.localStorage.getItem("token") && !Boolean(authorizedUser)) {
    return <Navigate to="/" />;
  }


  return (
    <Paper elevation={0} style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Upload preview
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Remove
          </Button>
          <img className={styles.image} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="Uploaded" />
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
          {isEditing ? "Save" : "Publish"}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};