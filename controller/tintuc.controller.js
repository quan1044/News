var theloaiModel = require('../model/theloai')
var loaitinModel = require('../model/loaitin')
var tintucModel = require('../model/tintuc')
var validator = require('../util/validator')
var { normalizeCharacter } = require('../util/normalizecharacter')
var fs = require('fs');
var multer = require('multer')
var path = require("path");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload/img/tintuc')
    },

    filename: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        let filename = path.basename(file.originalname, extension);
        cb(null, filename + '-' + Date.now() + extension)
    }
})
function fileFilter(req, file, cb) {
    console.log('fileter')
    let PageValidationResult = validator.validateNewsForm(req.body)
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
        console.log(req.session.errors)
        cb(new Error(''))
    } else {
        cb(null, true)
    }
}
var upload = multer({ fileFilter: fileFilter, storage: storage }).single('hinh')


module.exports = {
    getListPage: async (req, res) => {
        let lstTintuc = await tintucModel.getAll();
        res.render('admin/tintuc/danhsach', {
            lstTintuc: lstTintuc
        })
    },

    getAddPage: async (req, res) => {
        let lstTheloai = await theloaiModel.getAll()
        res.locals.errors = req.session.errors
        req.session.errors = null
        res.render('admin/tintuc/them', {
            lstTheloai: lstTheloai
        })
    },

    postAddPage: (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                res.redirect('them')
            } else if (!req.file) {
                let PageValidationResult = validator.validateNewsForm(req.body)
                if (PageValidationResult.errors) {
                    req.session.errors = PageValidationResult.errors
                    res.redirect('them')
                } else {
                    let item = {};
                    item.idLoaiTin = req.body.loaitin
                    item.TieuDe = req.body.tieude
                    item.TieuDeKhongDau = normalizeCharacter(req.body.tieude)
                    item.TomTat = req.body.tomtat
                    item.NoiDung = req.body.noidung
                    item.NoiBat = req.body.noibat
                    item.Hinh = ""
                    tintucModel.add(item).then(res.redirect('danhsach'))
                }
            } else {
                let item = {};
                item.idLoaiTin = req.body.loaitin
                item.TieuDe = req.body.tieude
                item.TieuDeKhongDau = normalizeCharacter(req.body.tieude)
                item.TomTat = req.body.tomtat
                item.NoiDung = req.body.noidung
                item.NoiBat = req.body.noibat
                item.Hinh = req.file.filename
                tintucModel.add(item).then(res.redirect('danhsach'))
            }
        })
    },

    delete: async (req, res) => {
        let img = await tintucModel.getImageByID(req.params.id)
        tintucModel.delete(req.params.id).then(() => {
            if (img.length >0){
                fs.unlink("./public/upload/img/tintuc/" + img, (err) => {
                    if (err) throw err;
                })
            }
            res.redirect('../danhsach')
        })
        
    },

    getEditPage: async (req, res) => {
        let lstTheloai = await theloaiModel.getAll()
        res.locals.errors = req.session.errors
        req.session.errors = null
        res.render('admin/tintuc/sua', {
            lstTheloai: lstTheloai,
            id: req.params.id
        })
    },

    postEditPage: async(req, res) => {
        upload(req, res, function (err) {
            if (err) {
                res.redirect('sua/' + req.body.id)
            } else if (!req.file) {
                let PageValidationResult = validator.validateNewsForm(req.body)
                if (PageValidationResult.errors) {
                    req.session.errors = PageValidationResult.errors
                    res.redirect('sua/' + req.body.id)
                } else {
                    let item = {};
                    item.idLoaiTin = req.body.loaitin
                    item.TieuDe = req.body.tieude
                    item.TieuDeKhongDau = normalizeCharacter(req.body.tieude)
                    item.TomTat = req.body.tomtat
                    item.NoiDung = req.body.noidung
                    item.NoiBat = req.body.noibat
                    item.Hinh = ""
                    tintucModel.update(item, req.body.id).then(res.redirect('danhsach'))
                }
            } else {
                let item = {};
                item.idLoaiTin = req.body.loaitin
                item.TieuDe = req.body.tieude
                item.TieuDeKhongDau = normalizeCharacter(req.body.tieude)
                item.TomTat = req.body.tomtat
                item.NoiDung = req.body.noidung
                item.NoiBat = req.body.noibat
                item.Hinh = req.file.filename
                tintucModel.update(item, req.body.id).then(res.redirect('danhsach'))
            }
        })
    }

}