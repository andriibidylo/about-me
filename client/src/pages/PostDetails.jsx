import React, { useState, useEffect } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from 'react-markdown'


export const PostDetails = () => {


  const [post, setPost] = useState()
  const [comment, setComment] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await axios.get(`/posts/${id}`)
        const comment = await axios.get(`/posts/${id}/comments`)
        setComment(comment.data)
        setPost(post.data)
        setIsLoading(false)

      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])


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
        commentsCount={post.commentsCount}
        tags={post.tags}
        isPostDetails
      >
        <ReactMarkdown children={post.text} />
      </Post>
      <CommentsBlock
        items={comment}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};