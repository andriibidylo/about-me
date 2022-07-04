import React,{useState, useEffect} from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from 'react-markdown'
export const PostDetails = () => {
const [data, setData] = useState()
const [isLoading, setIsLoading] = useState(true)
const {id} = useParams()

useEffect(()=>{
  const fetchData = async() => {
    try {
      const {data} = await axios.get(`/posts/${id}`)
      setData(data)
      setIsLoading(false)
  
    } catch (error) {
      console.log(error)
    }
  }
  fetchData()
  
},[])

if (isLoading) {
  return <Post isLoading/>
}
console.log(data)
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={`http://localhost:8000${data.imageUrl}`}
        user={data.author}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isPostDetails
      >
       <ReactMarkdown children={data.text} />,

      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "John Deere",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Test comment",
          },
          {
            user: {
              fullName: "Antony Che",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};