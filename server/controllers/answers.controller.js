const Answer = require('../models/answers.model');
const Post = require('../models/posts.model');

module.exports = {
    findAnswerByPost(req, res) {
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
    findAll(req, res) {
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
        }, (err, data) => {
            if (err) {
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
                req.body, {
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
    destroy: (req, res) => {
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
    upvote: (req, res) => {
        let userId = req.body.userId;
        let answerId = req.body.answerId;
        console.log('tes')

        Answer.findById(answerId)
            .then(data => {
                let indexUserUpvote = data.upvote.indexOf(userId);
                let indexUserDownvote = data.downvote.indexOf(userId);
                console.log(`index upvote ${indexUserUpvote}`)
                console.log(`index downvote ${indexUserDownvote}`)
                if ((indexUserUpvote == -1) && (indexUserDownvote == -1)) {
                    data.upvote.push(userId);
                    data.save()
                        .then(answer => {
                            return res.status(200).json({
                                message: 'succeed to upvote answer',
                                data: answer
                            })
                        })
                        .catch(err => {
                            return res.status(400).json({
                                message: 'failed to upvote answer',
                                err
                            })
                        })
                } else if ((indexUserUpvote == -1) && (indexUserDownvote != -1)) {
                    data.downvote.splice(indexUserDownvote, 1);
                    data.upvote.push(userId);
                    data.save()
                        .then(answer => {
                            return res.status(200).json({
                                message: 'succeed to upvote answer',
                                data: answer
                            })
                        })
                        .catch(err => {
                            return res.status(400).json({
                                message: 'failed to upvote answer',
                                err
                            })
                        })
                } else {
                    return res.status(200).json({
                        message: 'user already upvoted'
                    })
                }
            })
            .catch(err => {
                return res.status(400).json({
                    message: 'cannor find answer',
                    err
                })
            })
    },
    resetvote: (req, res) => {
        let answerId = req.body.answerId;
        Answer.findByIdAndUpdate(
                answerId, {
                    downvote: [],
                    upvote: []
                }, {
                    new: true
                }
            )
            .then(answer => {
                return res.status(200).json({
                    message: 'succeed to reset vote answer',
                    data: answer
                })
            })
            .catch(err => {
                return res.status(400).json({
                    message: 'failed to reset vote answer',
                    err
                })
            })
    },
    downvote: (req, res) => {
        let userId = req.body.userId;
        let answerId = req.body.answerId;

        Answer.findById(answerId)
            .then(data => {
                let indexUserUpvote = data.upvote.indexOf(userId);
                let indexUserDownvote = data.downvote.indexOf(userId);
                console.log(`index upvote ${indexUserUpvote}`)
                console.log(`index downvote ${indexUserDownvote}`)
                if ((indexUserUpvote == -1) && (indexUserDownvote == -1)) {
                    data.downvote.push(userId);
                    data.save()
                        .then(answer => {
                            return res.status(200).json({
                                message: 'succeed to downvote answer',
                                data: answer
                            })
                        })
                        .catch(err => {
                            return res.status(400).json({
                                message: 'failed to dowvote answer',
                                err
                            })
                        })
                } else if ((indexUserUpvote != -1) && (indexUserDownvote == -1)) {
                    data.upvote.splice(indexUserUpvote, 1);
                    data.downvote.push(userId);
                    data.save()
                        .then(answer => {
                            return res.status(200).json({
                                message: 'succeed to downvote answer',
                                data: answer
                            })
                        })
                        .catch(err => {
                            return res.status(400).json({
                                message: 'failed to upvote answer',
                                err
                            })
                        })
                } else {
                    return res.status(200).json({
                        message: 'user already downvoted'
                    })
                }
            })
            .catch(err => {
                return res.status(400).json({
                    message: 'cannor find answer',
                    err
                })
            })
    }
}