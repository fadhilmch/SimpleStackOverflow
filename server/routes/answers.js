const express = require('express');
const router = express.Router();
const {findAll, findById, create, destroy, update, findAnswerByPost} = require('../controllers/answers.controller')

router.get('/', findAll);

router.get('/:post_id', findAnswerByPost);
router.post('/:post_id', create);


router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', destroy);


module.exports = router;