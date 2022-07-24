import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"


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
  isLiked:{ 
    type: Boolean,
    default: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageUrl: String,
}, {
  timestamps: true,
},
).plugin(mongoosePaginate);

export default mongoose.model("Post ", PostSchema)