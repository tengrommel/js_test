import mongoose, { Schema } from 'mongoose'

const PostSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required'],
    minlength: [3, 'Title need to be longer!'],
    unique: true
  },
  text: {
    type: String,
    trim: true,
    required: [true, 'Text is requied!'],
    minlength: [10,'Text need to be longer!'],
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
})

export default mongoose.model('Post', PostSchema)