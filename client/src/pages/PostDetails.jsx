import React,{useState, useEffect} from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";

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
        imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={data.author}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isPostDetails
      >
        <p>{data.text}</p>
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