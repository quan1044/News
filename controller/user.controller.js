var userModel = require('../model/user')
var { validationResult } = require('express-validator');
var { normalizeCharacter } = require('../util/normalizecharacter')
const bcrypt = require('bcrypt');
const saltRounds = 2;


module.exports = {
    getListPage: async (req, res) => {
        let lstUser = await userModel.getAll();
        res.render('admin/user/danhsach', {
            lstUser: lstUser
        })
    },

    getAddPage: async (req, res) => {
        res.locals.errors = req.session.errors
        req.session.errors = null
        res.render('admin/user/them')
    },

    postAddPage: (req, res) => {
        let AddPageValidationResult = validationResult(req);
        if (!AddPageValidationResult.isEmpty()) {
            req.session.errors = AddPageValidationResult.errors
            res.redirect('them')
        } else {
            let item = {};
            item.name = req.body.name
            item.email = req.body.email
            item.quyen = req.body.quyen
            item.password = bcrypt.hashSync(req.body.password, saltRounds);
            userModel.add(item).then(res.redirect('danhsach'))
        }
    },

    delete: async (req, res) => {
        userModel.delete(req.params.id).then(res.redirect('../danhsach'))
    },

    getLoginForm: async (req, res) => {
        res.render('admin/login')
    },

    login: async (req, res) => {
        userModel.login(req.body.email, req.body.password).then((result) => {
            if (result && result[0].quyen) {
                req.session.userId = result[0].name
                req.session.quyen = result[0].quyen
                res.redirect('theloai/danhsach')
            }
        }).catch(err => {
            res.redirect('login')
        });

    },

    logout: (req, res) => {
        delete req.session.userId
        res.redirect('login')
    }

}