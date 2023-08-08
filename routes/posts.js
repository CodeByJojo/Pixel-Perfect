const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const postsController = require('../controllers/posts');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//Simple Post Routes
router.get('/:id', ensureAuth, postsController.getPost); //removed ensureAuth after id

router.post('/createPost', upload.single('file'), postsController.createPost);
router.post('/createComment/:id', postsController.createComment) // maybe add ensureAuth

router.put('/likePost/:id', postsController.likePost);

router.delete('/deletePost/:id', postsController.deletePost);

router.delete('/deleteComment/:id', postsController.deleteComment);

module.exports = router;