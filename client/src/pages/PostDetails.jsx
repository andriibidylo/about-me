import React, { useState, useEffect } from "react";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import {fetchComments, fetchPosts, setPosts} from "../api"


export const PostDetails = () => {

  const [post, setPost] = useState()
  const [comment, setComment] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const [text, setText] = useState()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await fetchPosts(id)
        const comment = await fetchComments(id)
        setComment(comment)
        setPost(post)
        setIsLoading(false)

      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])


  const onSubmit = async () => {
    try {
      const data = {
        text
      }
      await setPosts(data, id)
      const comment = await fetchComments(id)
      setText("")
      setComment(comment)
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <Post isLoading />
  }

  return (
    <>
      <Post
        id={post._id}
        title={post.title}
        imageUrl={post.imageUrl ? `http://localhost:8000${post.imageUrl}` : ""}
        user={post.author}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={""}
        tags={post.tags}
        isPostDetails
      >
        <ReactMarkdown children={post.text} />
      </Post>
      <CommentsBlock
        items={comment}
        isLoading={false}
      >
        <AddComment onSubmit={onSubmit}  text={text} setText={setText}/>
      </CommentsBlock>
    </>
  );
};