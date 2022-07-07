import axios from "./axios";

export const fetchComments = async(id) =>{
  const {data} = await axios.get(`/posts/${id}/comments`)
  return data
}
export const fetchPosts = async(id) =>{
   const {data} = await axios.get(`/posts/${id}`)
   return data
}
export const setPosts = async (data, id) => {
  await axios.post(`/posts/${id}/comments`, data)
}