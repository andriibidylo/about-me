import PostModel from "../models/Post.js"
import { getPagination } from "../utils/pagination.js"

export const getAllPosts = async (req, res) => {
  try {
    let { title, popular, tags, page, size } = req.query;
    const query = {}

    const { limit, offset } = getPagination(page-1, size);

    if (title) {
      query.title = { '$regex': title, $options: 'i' }
    }
    if (tags) {
      query.tags = { '$regex': tags, $options: 'i' }
    }
    if (popular === "true") {
      popular = { "viewsCount": -1 }
    } else {
      popular = { "createdAt": -1 }
    }

    const post = await PostModel.paginate(query, { offset, limit, sort: popular, populate: 'author' })
    res.json(post)

  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ message: "Could not show posts" })
  }
}
export const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Return the post - error',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Post not found',
          });
        }

        res.json(doc);
      },
    ).populate(['likes','author', 'likesCount']);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Return the post - error',
    });
  }
}
export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags.split(','),
      imageUrl: req.body.imageUrl,
      author: req.userId,
    })
    const post = await doc.save()
    res.json(post)

  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ message: "Post did not create" })
  }
}
export const removePost = async (req, res) => {

  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Post did not delete',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Post not found',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Post did not get',
    });
  }
}
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
      console.log("BODY",req.body)
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        author: req.userId,
        tags: req.body.tags.split(','),
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Post did not update',
    });
  }
}
export const getTags = async (req, res) => {
  try {
    const post = await PostModel.find().limit(5).exec()

    const tags = post.map((obj) => obj.tags).flat().slice(0, 5)

    res.json(tags)
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Tags did not get',
    });
  }
}
