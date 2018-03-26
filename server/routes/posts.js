const express = require('express');
const router = express.Router();
const {resetvote, upvote, downvote, findAll, findById, create, destroy, update} = require('../controllers/posts.controller')

router.get('/', findAll);
router.post('/', create);

router.post('/upvote', upvote);
router.post('/downvote', downvote);
router.post('/reset', resetvote);

router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', destroy);


module.exports = router;