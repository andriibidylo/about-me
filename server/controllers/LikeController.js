import LikeModel from "../models/Like.js"

export const addLike = async (req, res) => {
  try {
    const doc = new LikeModel({
      userId: req.userId,
      postId: req.params.id
    })
    const likes = await doc.save()
    res.json(likes)

  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ message: "Like did not add" })
  }
}

export const removeLike = async (req, res) => {
  try {
    LikeModel.findOneAndDelete(
      {
        userId: req.userId,
        postId: req.params.id,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Like did not delete',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Like not found',
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
      message: 'Like did not get',
    });
  }
}
