const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const postsController = require('../controllers/posts');
const editorController = require('../controllers/editor');
const { ensureAuth, ensureGuest, ensureAdmin } = require('../middleware/auth');

//Simple Main Routes
router.get('/', homeController.getIndex); //This might need to change
router.get('/profile', ensureAuth, postsController.getProfile); //deleted getProfile off end
router.get('/feed', ensureAuth, postsController.getFeed); //This might not be needed
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

//New

// router.get('/pixel', ensureAuth, authController.getPixel)
router.get('/pixel', ensureAuth, postsController.getPixel);

router.get('/editor', ensureAdmin, authController.getEditor)

module.exports = router;