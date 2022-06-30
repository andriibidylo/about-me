import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts,fetchTags } from '../redux/posts/slice'
import { useDispatch, useSelector } from 'react-redux'
import { fabClasses } from '@mui/material';


export const Home = () => {

  const dispatch = useDispatch()
  const { posts, tags } = useSelector(state => state.posts)
  const isPostsLoading = posts.status === "loading"
  const isTagsLoading = tags.status === "loading"

  useEffect(() => {

    try {
      dispatch(fetchPosts())
      dispatch(fetchTags())
    } catch (error) {
      console.log(error)
    }
  }, [])

  console.log("isTagsLoading",isTagsLoading)

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
              imageUrl={post.imageUrl}
              user={post.author}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
              commentsCount={post.commentsCount}
              tags={post.tags}
              isEditable
              isLoading={false}
            />
            ))}
        </Grid>
        <Grid xs={4} item>
       {isTagsLoading ? (<TagsBlock isLoading={true}/>) : (<TagsBlock items={tags.items} isLoading={false}/>)}
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'John Deere',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'First comment',
              },
              {
                user: {
                  fullName: 'Antony Che',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};