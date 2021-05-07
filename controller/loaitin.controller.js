var theloaiModel = require('../model/theloai')
var loaitinModel = require('../model/loaitin')
var { validationResult } = require('express-validator');
var { normalizeCharacter } = require('../util/normalizecharacter')


module.exports = {
    getListPage: async (req, res) => {
        let lstLoaitin = await loaitinModel.getAll();
        res.render('admin/loaitin/danhsach', {
            lstLoaitin: lstLoaitin
        })
    },

    getAddPage: async (req, res) => {
        let lstTheloai = await theloaiModel.getAll()
        res.locals.errors = req.session.errors
        req.session.errors = null
        res.render('admin/loaitin/them', {
            lstTheloai: lstTheloai
        })
    },

    postAddPage: (req, res) => {
        let AddPageValidationResult = validationResult(req);
        if (!AddPageValidationResult.isEmpty()) {
            req.session.errors = AddPageValidationResult.errors
            res.redirect('them')
        } else {
            let item = {};
            item.idTheLoai = req.body.theloai
            item.Ten = normalizeCharacter(req.body.loaitin);
            item.TenKhongDau = normalizeCharacter(req.body.loaitin)
            loaitinModel.add(item).then(res.redirect('danhsach'))
        }
    },



    delete: async (req, res) => {
        loaitinModel.delete(req.params.id).then(res.redirect('../danhsach'))
    },

    getEditPage: async (req, res) => {
        let lstTheloai = await theloaiModel.getAll()
        res.locals.errors = req.session.errors
        req.session.errors = null
        res.render('admin/loaitin/sua', {
            lstTheloai: lstTheloai,
            id: req.params.id
        })
    },

    postEditPage: async (req, res) => {
        let EditPageValidationResult = validationResult(req)
        if (!EditPageValidationResult.isEmpty()) {
            req.session.errors = EditPageValidationResult.errors
            res.redirect('sua/' + req.body.id)
        } else {
            let item = {};
            item.idTheLoai = req.body.theloai
            item.Ten = req.body.loaitin
            item.TenKhongDau = normalizeCharacter(req.body.loaitin);
            loaitinModel.update(item, req.body.id).then(res.redirect('danhsach'))
        }
    },

    getListByAjax: async (req, res) => {
        let idTheLoai = req.params.idTheLoai
        let result = ""
        let lstLoaitin = await loaitinModel.getListByCategory(idTheLoai)
        lstLoaitin.forEach(item => {
            result += "<option value=" + item.id + " >" + item.Ten + "</option>"
        });
        res.send(result)
        // loaitinModel.getListByCategory(idTheLoai).then((lstLoaitin)=>{

        // })


    }

}