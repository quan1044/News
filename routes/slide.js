var express = require('express')
var router = express.Router()
var slideController = require('../controller/slide.controller')
var authenticator = require('../util/authenticator')



router.get('/danhsach', authenticator.check, slideController.getListPage)
router.get('/them', authenticator.check, slideController.getAddPage)
router.post('/them', authenticator.check, slideController.postAddPage);
router.get('/xoa/:id', authenticator.check, slideController.delete)
router.get('/sua/:id', authenticator.check, slideController.getEditPage)
router.post('/sua', authenticator.check, slideController.postEditPage);

module.exports = router