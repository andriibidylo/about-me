import React, { useEffect, useState, useRef } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchPostsByTag, fetchPostsByPopular } from '../redux/posts/slice'
import { fetchTags } from '../redux/tags/slice'
import { fetchAllComments } from '../redux/comments/slice'
import { useDispatch, useSelector } from 'react-redux'

export const formatDate = (timestemp) => {
  let date = new Date(timestemp).toUTCString();;
  return date.split(' ').slice(0, 4).join(' ');
}

export const Home = () => {
  const isSearch = useRef(false);
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.posts)
  const { tags } = useSelector(state => state.tags)
  const { allComments } = useSelector(state => state.comments)
  const { authorizedUser } = useSelector(state => state.auth)

  const isPostsLoading = posts.status === "loading"
  const isTagsLoading = tags.status === "loading"
  const isCommentsLoading = allComments.status === "loading"
  const [buttonValue, setButtonValue] = useState(0)

  useEffect(() => {
    try {
      dispatch(fetchPosts())
      dispatch(fetchTags())
      dispatch(fetchAllComments())
    } catch (error) {
      console.log(error)
    }
  }, [])

  const clickPopularPosts = () => {
    setButtonValue(1)
    dispatch(fetchPostsByPopular())
  }
  const clickAllPosts = () => {
    setButtonValue(0)
    dispatch(fetchPosts())
  }
  const clickOnTag = (tag) => {
    dispatch(fetchPostsByTag(tag))
  }
  const countCommentsForPost = (post) => {
    const filteredPosts = allComments.items.filter(el => el.post === post).length
    return filteredPosts
  }


  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={buttonValue} aria-label="basic tabs example">
        <Tab onClick={clickAllPosts} label="New" />
        <Tab onClick={clickPopularPosts} label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((post, index) => isPostsLoading ?
            (<Post key={index} isLoading={true} />) :
            (<Post
              key={post._id}
              id={post._id}
              title={post.title}
              imageUrl={post.imageUrl ? `http://localhost:8000${post.imageUrl}` : ""}
              user={post.author}
              createdAt={formatDate(post.createdAt)}
              viewsCount={post.viewsCount}
              commentsCount={countCommentsForPost(post._id)}
              tags={post.tags}
              isAuthor={authorizedUser?._id === post.author._id}
              isLoading={false}
            />
            ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock onClickOnTag={clickOnTag} items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={allComments.items.slice(0,5)}
            isLoading={isCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};