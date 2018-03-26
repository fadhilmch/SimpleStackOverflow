const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
  question: String,
  upvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  category: String,
  answers: [{
    type:Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema);