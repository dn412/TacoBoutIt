// this middleware relies on req.isAuthenticated() to allow or deny access

module.exports = function(req, res, next) {
    // pass the req/res to the next middleware/route handler
    if ( req.isAuthenticated() ) return next()

    // redirect to the login page if the user is not auth'd
    res.redirect('/auth/google')
}