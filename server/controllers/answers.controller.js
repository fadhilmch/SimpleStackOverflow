const Answer = require('../models/answers.model');
const Post = require('../models/posts.model');

module.exports = {
  findAnswerByPost (req, res) {
    Answer.find({
      question: req.params.post_id
    })
      .populate('user')
      .populate('upvote')
      .populate('downvote')
      .exec()
      .then(data => {
        return res.status(200).json({
          message: 'get all answer data by post',
          data
        })
      })
      .catch(err => {
        return res.status(400).json({
          message: 'failed to get answer data by post',
          err
        })
      })
  },
  findAll (req, res) {
    Answer.find()
        .populate('user')
        .populate('upvote')
        .populate('downvote')
        .populate('question')
        .exec()
        .then(data => {
          return res.status(200).json({
            message: "get all answer data",
            data
          })
        })
        .catch(err => {
          return res.status(400).json({
            message: 'failed to get all answers data',
            err
          })
        })
  },
  findById: (req, res) => {
    Answer.findOne({
        _id: req.params.id
        // userId : req.params.user_id
    })
    .populate('user')
    .populate('upvote')
    .populate('downvote')
    .exec()
    .then(data => {
        return res.status(200).json({
            message: "Succeed get answer data by id",
            data
        })
    })
    .catch(err => {
        return res.status(400).json({
            message: "Failed to get answer data by Id"
        })
    })
  },
  create: (req, res) => {
      Answer.create({
          answer: req.body.answer,
          user: req.body.user,
          upvote: [],
          downvote: [],
          question: req.params.post_id
      },(err, data) => {
          if(err){
              return res.status(400).json({
                  message: "Failed to create answer",
                  err
              })
          }
          console.log(`ID new answer: ${data._id}`);

          Post.findById(req.params.post_id)
            .then(post => {
                post.answers.push(data._id);
                post.save()
                    .then(updatedPost => {
                        return res.status(200).json({
                            message: "Succeed to create answer"
                        })
                    })
                    .catch(err => {
                        return res.status(400).json({
                            message: "Failed to create answer",
                            err
                        })
                    })
            })
          
      })

  },
  update: (req, res) => {
    console.log(req.params.id);
      Answer.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
              new: true
          }
      )
      .then((data) => {
        console.log(data)
          return res.status(200).json({
              message: "Succeed to update answer data",
              data
          })
      })
      .catch(err => {
          return res.status(400).json({
              message: "failed to update data"
          })
      })
  },
  destroy: (req,res) => {
      Answer.findByIdAndRemove(
          req.params.id
      )
      .then(() => {
          return res.status(200).json({
              message: "Succeed to delete data"
          })
      })
      .catch(() => {
          return res.status(400).json({
              message: "Failed to delete data"
          })
      })
  },
}