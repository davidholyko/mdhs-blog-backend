const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toObject: {virtuals: true}
})

blogSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'blog'
})

module.exports = mongoose.model('Blog', blogSchema)
