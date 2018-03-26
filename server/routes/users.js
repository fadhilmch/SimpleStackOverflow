var express = require('express');
var router = express.Router();
var {signIn, signUp, findAll, destroy, create} = require('../controllers/users.controller');

router.get('/', findAll);
router.post('/signin', signIn);
router.post('/signup', signUp);
router.delete('/:id', destroy);
// router.post('/', create);

module.exports = router;
