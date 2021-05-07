var express = require('express')
var router = express.Router()
var loaitinController = require('../controller/loaitin.controller')
var validator = require('../util/validator')
var authenticator = require('../util/authenticator')

router.get('/danhsach', authenticator.check, loaitinController.getListPage)
router.get('/them', authenticator.check, loaitinController.getAddPage)
router.post('/them', authenticator.check, validator.validateNewsTypeForm(), loaitinController.postAddPage);
router.get('/xoa/:id', authenticator.check, loaitinController.delete)
router.get('/sua/:id', authenticator.check, loaitinController.getEditPage)
router.post('/sua', authenticator.check, validator.validateNewsTypeForm(), loaitinController.postEditPage);
router.get('/getListByAjax/:idTheLoai', authenticator.check, loaitinController.getListByAjax)

module.exports = router