import mongoose from "mongoose"
const Schema = mongoose.Schema

const NewsSchema = new Schema({
  title: { 
    type: String, 
    required:true 
  },
  text: { 
    type: String, 
    required:true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  banner: { 
    type: String, 
    required:true 
  },
  likes: { 
    type: Array, 
    default: [],
    required: true 
  },
  comments: { 
    type: Array,
    default: [], 
    required:true 
  }
});

const News = mongoose.model('News', NewsSchema);

export default News