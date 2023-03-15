module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }   else {
            res.redirect('/');
        }
    },
    ensureGuest: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }   else {
            res.redirect('/dashboard') // Find out what dashboard is
        }
    },

    //Admin Attempt

    ensureAdmin: function (req, res, next) {
        if(req.isAuthenticated() && req.user.level === 'admin'){
            return next();
        } else {
            res.redirect('/pixel')
        }
    },
};