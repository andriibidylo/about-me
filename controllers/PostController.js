import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import PostModel from "../models/Post.js"


export const create = async (req, res) => {
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