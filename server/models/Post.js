import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
import Like from './Like.js'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: []
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageUrl: String,
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
},
).plugin(mongoosePaginate);

PostSchema.virtual('likes', {
  ref: Like,
  localField: '_id',
  foreignField: 'postId'
});
PostSchema.virtual('likesCount', {
  ref: Like,
  localField: '_id',
  foreignField: 'postId',
  count: true
});

PostSchema.pre('find', function () {
  this.populate(['likes',"likesCount"]);
});

export default mongoose.model("Post ", PostSchema)