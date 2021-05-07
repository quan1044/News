var express = require('express')
var router = express.Router()
var userController = require('../controller/user.controller')



router.get('/', userController.getLoginForm)
router.post('/', userController.login)


module.exports = router