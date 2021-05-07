var url = require('url');
var theloaiModel = require('../model/theloai')
var { validationResult } = require('express-validator');
var { normalizeCharacter } = require('../util/normalizecharacter')


module.exports = {
    getListPage: async (req, res) => {
        let lstTheloai = await theloaiModel.getAll();
        res.render('admin/theloai/danhsach', {
            lstTheloai: lstTheloai,
        })
    },

    getAddPage: (req, res) => {
        res.render('admin/theloai/them')
    },

    postAddPage: (req, res) => {
        let AddPageValidationResult = validationResult(req);
        if (!AddPageValidationResult.isEmpty()) {
            res.render('admin/theloai/them', { errors: AddPageValidationResult.errors })
        } else {
            let item = {};
            item.Ten = req.body.tenTheLoai
            item.TenKhongDau = normalizeCharacter(req.body.tenTheLoai);
            theloaiModel.add(item).then(async () => {
                let lstTheloai = await theloaiModel.getAll();
                res.render('admin/theloai/danhsach', {
                    lstTheloai: lstTheloai
                })
            })
        }
    },

    delete: async (req, res) => {
        theloaiModel.delete(req.params.id).then(async () => {
            let lstTheloai = await theloaiModel.getAll();
            res.render('admin/theloai/danhsach', {
                lstTheloai: lstTheloai
            })
        })
    },

    getEditPage: (req, res) => {
        res.locals.errors = req.session.errors
        req.session.errors = null
        res.render('admin/theloai/sua', { id: req.params.id })
    },

    postEditPage: async (req, res) => {
        let EditPageValidationResult = validationResult(req);
        if (!EditPageValidationResult.isEmpty()) {
            req.session.errors = EditPageValidationResult.errors
            res.redirect('sua/' + req.body.id)
        } else {
            let item = {};
            item.Ten = req.body.tenTheLoai
            item.TenKhongDau = normalizeCharacter(req.body.tenTheLoai);
            theloaiModel.update(item, req.body.id).then(async () => {
                let lstTheloai = await theloaiModel.getAll();
                res.render('admin/theloai/danhsach', {
                    lstTheloai: lstTheloai
                })
            })
        }
    }

}