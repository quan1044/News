var express = require('express')
var router = express.Router()
var theloaiController = require('../controller/theloai.controller')
var validator = require('../util/validator')
var authenticator = require('../util/authenticator')



router.get('/danhsach', authenticator.check, theloaiController.getListPage)
router.get('/them', authenticator.check, theloaiController.getAddPage)
router.post('/them', authenticator.check, validator.validateCategoryForm(), theloaiController.postAddPage);
router.get('/xoa/:id', authenticator.check, theloaiController.delete)
router.get('/sua/:id', authenticator.check, theloaiController.getEditPage)
router.post('/sua', authenticator.check, validator.validateCategoryForm(), theloaiController.postEditPage);

module.exports = router