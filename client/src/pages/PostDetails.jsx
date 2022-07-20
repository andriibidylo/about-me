import React, { useState, useEffect } from "react";
import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { fetchComments, fetchPosts, setPosts } from "../api"
import { useSelector } from 'react-redux'
import { formatDate } from '../helpers'


export const PostDetails = () => {

  const { allComments } = useSelector(state => state.comments)

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
  }, [allComments])


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
        createdAt={formatDate(post.createdAt)}
        viewsCount={post.viewsCount}
        commentsCount={comment.length}
        tags={post.tags}
        isPostDetails
      >
        <ReactMarkdown children={post.text} />
      </Post>
      <CommentsBlock
        items={comment}
        isLoading={false}
      >
        <AddComment onSubmit={onSubmit} text={text} setText={setText} />
      </CommentsBlock>
    </>
  );
};