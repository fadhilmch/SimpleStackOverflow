const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema ({
  answer: String,
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  upvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Answer', answerSchema);