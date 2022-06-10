const jwt = require('jsonwebtoken')
const errfunc = require('../utils/error')


//werify token
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errfunc.createError(401, "You are not authenticated"))
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(errfunc.createError(401, "Your token is expired!"))
        req.user = user;
        next()
    })

}
//verify user or admin allow
exports.verifyUser = (req, res, next) => {

    if (req.user.id === req.params.id || req.user.isAdmin) {
        next()
    } else {
        return next(errfunc.createError(403, "Your are not authorized!"))
    }

}