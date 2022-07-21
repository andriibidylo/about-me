import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts } from '../redux/posts/slice'
import { setSortByPopular } from '../redux/filters/slice'
import { fetchTags } from '../redux/tags/slice'
import { fetchAllComments } from '../redux/comments/slice'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate, countCommentsForPost } from '../helpers'
import { Pagination } from '../components/Pagination/index'

export const Home = () => {

  const dispatch = useDispatch()

  const { posts } = useSelector(state => state.posts)
  const { tags } = useSelector(state => state.tags)
  const { allComments } = useSelector(state => state.comments)
  const { authorizedUser } = useSelector(state => state.auth)
  const { searchValue, sortByTag, sortByPopular } = useSelector(state => state.filters)

  const isPostsLoading = posts.status === "loading"
  const isTagsLoading = tags.status === "loading"
  const isCommentsLoading = allComments.status === "loading"


  useEffect(() => {
    try {
      dispatch(fetchPosts({ searchValue, sortByTag, sortByPopular }))
    } catch (error) {
      console.log(error)
    }
  }, [searchValue, sortByTag, sortByPopular])

  useEffect(() => {
    try {
      dispatch(fetchTags())
      dispatch(fetchAllComments())
    } catch (error) {
      console.log(error)
    }
  }, [])

  const toggleSortPosts = (value) => {
    dispatch(setSortByPopular(value))
  }

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={sortByPopular} aria-label="basic tabs example">
        <Tab onClick={() => toggleSortPosts(0)} label="New" />
        <Tab onClick={() => toggleSortPosts(1)} label="Popular" />
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
              commentsCount={countCommentsForPost(post._id, allComments)}
              tags={post.tags}
              isAuthor={authorizedUser?._id === post.author._id}
              isLoading={false}
            />
            ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={allComments.items.slice(0, 5)}
            isLoading={isCommentsLoading}
          />
        </Grid>
        <Pagination currentPage={"currentPage"} onClickPage={""} />
      </Grid>
 
    </>
  );
};