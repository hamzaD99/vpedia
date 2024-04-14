const passport = require('passport')
const passwordMiddleware = (req, res, next) => {
    const { email, userName } = req.body
    req.body.handle = userName ? userName : email ? email : null;
    passport.authenticate('local', {
        successRedirect: '/users/sucess-login',
        failureRedirect: '/users/failure-login',
        failureFlash: true
    })(req, res, next);
};

module.exports = {
    passwordMiddleware,
};