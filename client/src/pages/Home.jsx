import React, { useEffect,useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags, fetchLastComments } from '../redux/posts/slice'
import { useDispatch, useSelector } from 'react-redux'


export const Home = () => {

  const dispatch = useDispatch()
  const { posts, tags, lastComments } = useSelector(state => state.posts)
  
  const { data } = useSelector(state => state.auth)
  const isPostsLoading = posts.status === "loading"
  const isTagsLoading = tags.status === "loading"
  const isCommentsLoading = lastComments.status === "loading"

  useEffect(() => {
    try {
      dispatch(fetchPosts())
      dispatch(fetchTags())
      dispatch(fetchLastComments())
    } catch (error) {
      console.log(error)
    }
  }, [])


  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((post, index) => isPostsLoading ?
            (<Post key={index} isLoading={true} />) :
            (<Post
              key={post._id}
              id={post._id}
              title={post.title}
              imageUrl={post.imageUrl ?`http://localhost:8000${post.imageUrl}` : ""}
              user={post.author}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
              commentsCount={post.commentsCount}
              tags={post.tags}
              isAuthor={data?._id === post.author._id}
              isLoading={false}
            />
            ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={lastComments.items}
            isLoading={isCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};