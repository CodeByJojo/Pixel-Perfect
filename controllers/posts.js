const cloudinary = require('../middleware/cloudinary');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { default: mongoose } = require('mongoose');



module.exports = {
    getProfile: async (req, res) => {
        try {
            const posts = await Post.find({ user: req.user.id });
            const comments = await Comment.find({ user: req.user.id}).populate('comments')
            res.render('profile.ejs', { comments: comments, user: req.user });
        }   catch (err) {
            console.log(err);
        }
    },
    getFeed: async (req, res) => {
        try {
            const posts = await Post.find().sort({ createdAt: 'desc' }).lean();
            res.render('feed.ejs', { posts: posts});
        } catch (err) {
            console.log(err);
        }
    },
    getPost: async (req, res) => {
        try { 
            const post = await Post.findById(req.params.id).populate('comments').populate('user');
            const user = req.user;
            
        
        if(req.session){
            res.render('post.ejs', { post: post, user: user});
        } else {
            res.render('post.ejs', { post: post})
        }

            

        } catch (err) {
            console.log(err);
        }
    },
    createPost: async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path);

            await Post.create({
                title: req.body.title,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                caption: req.body.caption,
                likes: 0,
                user: req.user.id,
                userName: req.user.userName,
            });
            console.log('Post has been created');
            res.redirect('/pixel');
        } catch (err) {
            console.log(err);
        }
    },
    createComment: async (req, res) => {
        try {
               let theComment =  await Comment.create({
                text: req.body.text,
                user: req.user.id,
                userName: req.user.userName,
                thePost: req.params.id,
            }); 

            await Post.findByIdAndUpdate(
                {_id: req.params.id},
                {
                    $push: {comments: theComment}
                }
            );

            await Post.find({_id: req.params.id})
            .populate('comments')

            console.log('Comment Created');
            res.redirect(`/post/${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
    },
    likePost: async (req, res) => {
        try {
            await Post.findOneAndUpdate(
                {_id: req.params.id },
                {
                    $inc: { likes: 1 },
                }
            );
            console.log('Likes +1');
            res.redirect(`/post/${req.params.id}#newLikeBtn`);
        } catch (err) {
            console.log(err)
        }
    },
    deletePost: async (req, res) => {
        try {
            let post = await Post.findById({ _id: req.params.id });

            await cloudinary.uploader.destroy(post.couldinaryId);

            await Post.remove({ _id: req.params.id });
            console.log('Deleted Post');
            res.redirect('/pixel');
        } catch (err) {
            res.redirect('/pixel')
        }
    },

    deleteComment: async (req, res) => {
        try {
            await Comment.deleteOne({ _id: req.params.id });
            console.log('Deleted Comment');

            res.redirect('back');   
        } catch (err) {
            res.redirect('/pixel');
        }
    },

    //Mine Below and Directly Above
    getPixel: async (req, res) => {
       try {
        const posts = await Post.find().sort({ createdAt: 'desc' }).lean();
        const user = req.user;

        if(req.session){
            res.render('pixel.ejs', {posts: posts, user: user});
        } else {
            res.render('pixel.ejs', {posts: posts})};
       } catch (err) {
        console.log(err);
       }
    },
}


