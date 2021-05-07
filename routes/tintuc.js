var express = require('express')
var router = express.Router()
var tintucController = require('../controller/tintuc.controller')
var authenticator = require('../util/authenticator')

router.get('/danhsach', authenticator.check, tintucController.getListPage)
router.get('/them', authenticator.check, tintucController.getAddPage)
router.post('/them', authenticator.check, tintucController.postAddPage);
router.get('/xoa/:id', authenticator.check, tintucController.delete)
router.get('/sua/:id', authenticator.check, tintucController.getEditPage)
router.post('/sua', authenticator.check, tintucController.postEditPage);

module.exports = router