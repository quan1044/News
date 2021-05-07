var express = require('express')
var router = express.Router()
var pageController = require('../controller/page.controller')
var theloaiModel = require('../model/theloai')
var loaitinModel = require('../model/loaitin')
var authenticator = require('../util/authenticator')

async function getSideMenu (req, res, next) {
    if (!req.session.lstTheloai) {
        let lstTheloai = await theloaiModel.getAll()
        let getLisNewsTypeByCategory = (theloai) => new Promise(resolve => {
            loaitinModel.getListByCategory(theloai.id).then(lstLoaitin => {
                theloai.lstLoaitin = lstLoaitin
                resolve(theloai)
            })
        })
        lstTheloai = await Promise.all(lstTheloai.map(theloai => getLisNewsTypeByCategory(theloai)))
        req.session.lstTheloai = lstTheloai
    }
    next();
}

async function getUser (req, res, next) {
    if (req.session.userId) {
        res.locals.userId = req.session.userId
    }
    next()
}


router.get('/index', getUser, getSideMenu, pageController.getIndexPage)
router.get('/loaitin/:tenloaitin/page=:page', getUser, getSideMenu, pageController.getNewsTypePage)
router.get('/tintuc/:tieude', getUser, pageController.getNews)
router.get('/login', pageController.getLoginForm)
router.post('/login', pageController.postLoginForm)
router.get('/logout', pageController.logout)



module.exports = router