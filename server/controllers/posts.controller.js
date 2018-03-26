const Post = require('../models/posts.model');

module.exports = {
    findAll(req, res) {
        Post.find()
            .populate('user')
            .populate('answers')
            .populate('upvote')
            .populate('downvote')
            .sort('-createdAt')
            .exec()
            .then(data => {
                return res.status(200).json({
                    message: "get all post data",
                    data
                })
            })
            .catch(err => {
                return res.status(400).json({
                    message: 'failed to get all posts data',
                    err
                })
            })
    },
    findById: (req, res) => {
        Post.findOne({
                _id: req.params.id
                // userId : req.params.user_id
            })
            .populate('user')
            .populate('answers')
            .populate('upvote')
            .populate('downvote')
            .exec()
            .then(data => {
                return res.status(200).json({
                    message: "Succeed get post data by id",
                    data
                })
            })
            .catch(err => {
                return res.status(400).json({
                    message: "Failed to get post data by Id"
                })
            })
    },
    create: (req, res) => {
        Post.create({
            question: req.body.question,
            user: req.body.user,
            upvote: [],
            downvote: [],
            answers: []
        }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: "Failed to create post",
                    err
                })
            }
            return res.status(200).json({
                message: "Succeed to create post"
            })
        })

    },
    update: (req, res) => {
        console.log(req.params.id);
        Post.findByIdAndUpdate(
                req.params.id,
                req.body, {
                    new: true
                }
            )
            .then((data) => {
                console.log(data)
                return res.status(200).json({
                    message: "Succeed to update post data",
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
        Post.findByIdAndRemove(
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
        let postId = req.body.postId;

        Post.findById(postId)
            .then(data => {
                let indexUserUpvote = data.upvote.indexOf(userId);
                let indexUserDownvote = data.downvote.indexOf(userId);
                console.log(`index upvote ${indexUserUpvote}`)
                console.log(`index downvote ${indexUserDownvote}`)
                if ((indexUserUpvote == -1) && (indexUserDownvote == -1)) {
                    data.upvote.push(userId);
                    data.save()
                        .then(post => {
                            return res.status(200).json({
                                message: 'succeed to upvote post',
                                data: post
                            })
                        })
                        .catch(err => {
                            return res.status(400).json({
                                message: 'failed to upvote post',
                                err
                            })
                        })
                } else if ((indexUserUpvote == -1) && (indexUserDownvote != -1)) {
                    data.downvote.splice(indexUserDownvote, 1);
                    data.upvote.push(userId);
                    data.save()
                        .then(post => {
                            return res.status(200).json({
                                message: 'succeed to upvote post',
                                data: post
                            })
                        })
                        .catch(err => {
                            return res.status(400).json({
                                message: 'failed to upvote post',
                                err
                            })
                        })
                }
                else {
                    return res.status(200).json({
                        message: 'user already upvoted'
                    })
                }
            })
            .catch(err => {
                return res.status(400).json({
                    message: 'cannor find post',
                    err
                })
            })
    },
    resetvote:(req, res) => {
        let postId = req.body.postId;
        Post.findByIdAndUpdate(
            postId, {
                downvote: [],
                upvote: []
            }, {
                new: true
            }
        )
        .then(post => {
            return res.status(200).json({
                message: 'succeed to reset vote post',
                data: post
            })
        })
        .catch(err => {
            return res.status(400).json({
                message: 'failed to reset vote post',
                err
            })
        }) 
    },
    downvote: (req, res) => {
        let userId = req.body.userId;
        let postId = req.body.postId;

        Post.findById(postId)
            .then(data => {
                let indexUserUpvote = data.upvote.indexOf(userId);
                let indexUserDownvote = data.downvote.indexOf(userId);
                console.log(`index upvote ${indexUserUpvote}`)
                console.log(`index downvote ${indexUserDownvote}`)
                if ((indexUserUpvote == -1) && (indexUserDownvote == -1)) {
                    data.downvote.push(userId);
                    data.save()
                        .then(post => {
                            return res.status(200).json({
                                message: 'succeed to downvote post',
                                data: post
                            })
                        })
                        .catch(err => {
                            return res.status(400).json({
                                message: 'failed to dowvote post',
                                err
                            })
                        })
                } else if ((indexUserUpvote != -1) && (indexUserDownvote == -1)) {
                    data.upvote.splice(indexUserUpvote, 1);
                    data.downvote.push(userId);
                    data.save()
                        .then(post => {
                            return res.status(200).json({
                                message: 'succeed to downvote post',
                                data: post
                            })
                        })
                        .catch(err => {
                            return res.status(400).json({
                                message: 'failed to upvote post',
                                err
                            })
                        })
                }
                else {
                    return res.status(200).json({
                        message: 'user already downvoted'
                    })
                }
            })
            .catch(err => {
                return res.status(400).json({
                    message: 'cannor find post',
                    err
                })
            })
    }
}