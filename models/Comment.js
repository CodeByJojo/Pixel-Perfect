const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userName: {
        type: String,
        required: true,
    },
    thePost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'thePost'
    }
});

module.exports = mongoose.model('Comment', CommentSchema); 

