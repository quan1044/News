var theloaiModel = require('../model/theloai')
var loaitinModel = require('../model/loaitin')
var tintucModel = require('../model/tintuc')
var userModel = require('../model/user')
var slideModel = require('../model/slide')
var { validationResult } = require('express-validator');
var { normalizeCharacter } = require('../util/normalizecharacter');
var theloai = require('../model/theloai');
const { resolve } = require('path');




module.exports = {
    getIndexPage: async (req, res) => {
        let lstTheloai = req.session.lstTheloai
        let getHighlightNewsByCategory = (theloai) => new Promise(resolve => {
            tintucModel.getHighlightNewsByCategory(theloai.id).then(lstTintuc => {
                theloai.lstTintuc = lstTintuc
                resolve(theloai)
            })
        })
        lstTheloai = await Promise.all(lstTheloai.map(theloai => getHighlightNewsByCategory(theloai)))
        let lstSlide = await slideModel.getAll()
        res.render('page/index', {
            lstTheloai: lstTheloai,
            lstSlide: lstSlide
        })
    },

    getNewsTypePage: async (req, res) => {
        let loaitin = await loaitinModel.getByNormalizeName(req.params.tenloaitin)
        let lstTintuc = await tintucModel.getByNewsType(loaitin[0].id, req.params.page)    
        res.render('page/newstype', {
            lstTheloai: req.session.lstTheloai,
            loaitin: loaitin,
            lstTintuc: lstTintuc
        })
    },

    getNews: async (req, res) => {
        let tintuc = await tintucModel.getByNormalizeTitle(req.params.tieude)
        let tintuclienquan = await tintucModel.getRelativeNewsByIdAndIdLoaiTin(tintuc[0].id, tintuc[0].idLoaiTin)
        let tintucnoibat = await tintucModel.getHighlightNews();
        res.render('page/detail', {
            tintuc: tintuc[0],
            tintuclienquan: tintuclienquan,
            tintucnoibat: tintucnoibat
        })
    },

    getLoginForm: async (req, res) => {
        res.render('page/login')
    },

    postLoginForm: async (req, res) => {
        userModel.login(req.body.email, req.body.password).then((result) => {
            if (result) {
                req.session.userId = result[0].name
                res.redirect('index')
            }
        }).catch(err => {
            res.redirect('login')
        });

    },

    logout: async (req, res) =>  {
        delete req.session.userId
        res.redirect('index')
    }

}