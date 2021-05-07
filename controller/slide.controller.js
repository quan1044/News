var slideModel = require('../model/slide')
var validator = require('../util/validator')
var { normalizeCharacter } = require('../util/normalizecharacter')
var fs = require('fs');
var multer = require('multer')
var path = require("path");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload/img/slide')
    },

    filename: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        let filename = path.basename(file.originalname, extension);
        cb(null, filename + '-' + Date.now() + extension)
    }
})
function fileFilter(req, file, cb) {
    let PageValidationResult = validator.validateSlideForm(req.body)
    var type = file.mimetype;
    var typeArray = type.split("/");
    if (typeArray[0] != "image") {
        PageValidationResult.errors.push({
            value: file.filename,
            msg: 'File ảnh không đúng định dạng',
            param: 'hinh',
            location: 'body'
        })
    }
    if (PageValidationResult.errors) {
        req.session.errors = PageValidationResult.errors
        cb(new Error(''))
    } else {
        cb(null, true)
    }
}
var upload = multer({ fileFilter: fileFilter, storage: storage }).single('hinh')


module.exports = {
    getListPage: async (req, res) => {
        let lstSlide = await slideModel.getAll();
        res.render('admin/slide/danhsach', {
            lstSlide: lstSlide
        })
    },

    getAddPage: async (req, res) => {
        res.locals.errors = req.session.errors
        req.session.errors = null
        res.render('admin/slide/them')
    },

    postAddPage: (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                res.redirect('them')
            } else if (!req.file) {
                req.session.errors = {
                    value: null,
                    msg: 'Bạn chưa nhập ảnh',
                    param: 'hinh',
                    location: 'body'
                }
                res.redirect('them')
            } else {
                let item = {};
                item.Ten = req.body.ten
                item.Hinh = req.file.filename
                item.NoiDung = req.body.noidung
                item.link = req.body.link
                slideModel.add(item).then(res.redirect('danhsach'))
            }
        })
    },

    delete: async (req, res) => {
        let img = await slideModel.getImageByID(req.params.id)
        slideModel.delete(req.params.id).then(() => {
            if (img.length > 0) {
                fs.unlink("./public/upload/img/slide/" + img, (err) => {
                    if (err) throw err;
                })
            }
            res.redirect('../danhsach')
        })

    },

    getEditPage: async (req, res) => {
        res.locals.errors = req.session.errors
        req.session.errors = null
        res.render('admin/slide/sua', {
            id: req.params.id
        })
    },

    postEditPage: async(req, res) => {
        upload(req, res, function (err) {
            if (err) {
                res.redirect('sua/' + req.body.id)
            } else if (!req.file) {
                req.session.errors = {
                    value: null,
                    msg: 'Bạn chưa nhập ảnh',
                    param: 'hinh',
                    location: 'body'
                }
                res.redirect('sua/' + req.body.id)
            } else {
                let item = {};
                item.Ten = req.body.ten
                item.Hinh = req.file.filename
                item.NoiDung = req.body.noidung
                item.link = req.body.link
                slideModel.update(item, req.body.id).then(res.redirect('danhsach'))
            }
        })
    }

}