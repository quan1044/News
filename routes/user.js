var express = require('express')
var router = express.Router()
var userController = require('../controller/user.controller')
var validator = require('../util/validator')
var authenticator = require('../util/authenticator')



router.get('/danhsach', authenticator.check, userController.getListPage)
router.get('/them', authenticator.check, userController.getAddPage)
router.post('/them', authenticator.check, validator.validateUserForm(), userController.postAddPage);
router.get('/xoa/:id', authenticator.check, userController.delete)

module.exports = router