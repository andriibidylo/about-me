import PostModel from "../models/Post.js"

export const getAllPosts = async (req, res) => {
  try {
    const post = await PostModel.find()
    res.json(post)

  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ message: "Could not show all posts" })
  }
}
export const createPost = async (req, res) => {
  try {
    const doc = new PostModel ({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      author: req.userId
    })
    const post = await doc.save()
    res.json(post)

  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ message: "Post did not create" })
  }
}