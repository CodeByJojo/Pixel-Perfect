const passport = require('passport'); 
const validator = require('validator');
const User = require('../models/User');




// exports.getEditor = (req, res) => {
//     res.render('editor', {
//         title: 'Editor Test',
//     });
// }

module.exports = {
    getEditor: async (req, res) => {
        try {
        const user = req.user;

        if(req.session){
            res.render('editor', {user: user});
        } else {
            res.render('editor')};
        } catch (err) {
        console.log(err);
        }
    }
}