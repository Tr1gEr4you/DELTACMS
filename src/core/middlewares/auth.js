function authenticateUser() {
    return (req, res, next) => {
        if (req.session.userLogin) {
            return next()
        } else {
            res.redirect('/auth')
        }
    }
}

module.exports = {
    authenticateUser
}