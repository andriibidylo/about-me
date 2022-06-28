import PostModel from "../models/Post.js"

export const getAllPosts = async (req, res) => {
  try {
    const post = await PostModel.find().populate("author").exec()
    res.json(post)

  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ message: "Could not show all posts" })
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
    ).populate('user');
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Return the post - error',
    });
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
updatePost
export const updatePost = async (req, res) => {

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