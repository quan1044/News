module.exports = {
    check: (req, res, next) => {
        if (!req.session.userId || !req.session.quyen) {
            res.redirect('../login')
        } else {
            res.locals.userId = req.session.userId
            next();
        }
    },
}