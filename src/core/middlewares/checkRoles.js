function checkRole(flags) {
    return (req, res, next) => {
        if (req.session.user) {
            if (req.session.userFlags.includes(flags)) {
                return next();
            } else {
                res.send('Access denied');
            }
        } else {
            res.redirect('auth/login')
        }
    }
}

module.exports = {
    checkRole
}