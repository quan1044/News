var theloai = require('./theloai')
var loaitin = require('./loaitin')
var tintuc = require('./tintuc')
var user = require('./user')
var slide = require('./slide')
var login = require('./login')
var logout = require('./logout')
var page = require('./page')

module.exports = (app) => {
    app.use('/admin/theloai', theloai)
    app.use('/admin/loaitin', loaitin)
    app.use('/admin/tintuc', tintuc)
    app.use('/admin/user', user)
    app.use('/admin/slide', slide)
    app.use('/admin/login', login)
    app.use('/admin/logout', logout)
    app.use('/page', page)
}