import CommentModel from "../models/Comment.js"

export const getAllCommentsForPost = async (req, res) => {
  try {
    const post = await CommentModel.find({ "post": req.params.id }).sort({ "createdAt": -1 }).populate("author").exec()
    res.json(post)

  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ message: "Could not show all posts" })
  }
}

export const getLastFourComments = async (req, res) => {
  try {
    const post = await CommentModel.find().limit(4).sort({ "createdAt": -1 }).populate("author").exec()
    res.json(post)

  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ message: "Could not show all posts" })
  }
}

export const createComment = async (req, res) => {
  try {
    const doc = new CommentModel({
      text: req.body.text,
      author: req.userId,
      post: req.params.id
    })
    const comment = await doc.save()
    res.json(comment)

  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ message: "Comment did not create" })
  }
}