const express = require('express');
const router = express.Router();
const {upvote, downvote, resetvote, findAll, findById, create, destroy, update, findAnswerByPost} = require('../controllers/answers.controller')

router.get('/', findAll);

router.post('/upvote', upvote);
router.post('/downvote', downvote);
router.post('/reset', resetvote);

router.get('/:post_id', findAnswerByPost);
router.post('/:post_id', create);

router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', destroy);


module.exports = router;