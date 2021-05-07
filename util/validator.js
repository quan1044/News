const { check, body } = require('express-validator');
var userModel = require('../model/user')

var validateCategoryForm = () => {
    return [
        check('tenTheLoai').not().isEmpty().withMessage('Bạn chưa nhập tên thể loại').bail()
            .isLength({ min: 2 }).withMessage('Tên thể loại phải có ít nhất 2 kí tự'),
    ]
}

var validateNewsTypeForm = () => {
    return [
        check('theloai').isInt({ gt: 0 }).withMessage('Bạn chưa nhập thể loại'),
        check('loaitin').not().isEmpty().withMessage('Bạn chưa nhập tên loại tin').bail()
            .isLength({ min: 2 }).withMessage('Loại tin phải có ít nhất 2 kí tự')
    ]
}

// var validateNewsForm = () => {
//     return [
//         check('theloai').isInt({gt: 0}).withMessage('Bạn chưa nhập thể loại'),
//         check('loaitin').isInt({gt: 0}).withMessage('Bạn chưa nhập loại tin'),
//         check('tieude').not().isEmpty().withMessage('Bạn chưa nhập tên tiêu đề').bail()
//         .isLength({ min: 2 }).withMessage('Tiêu đề phải có ít nhất 2 kí tự'),
//         check('tomtat').not().isEmpty().withMessage('Bạn chưa nhập phần tóm tắt').bail()
//         .isLength({ min: 10 }).withMessage('Tóm tắt phải có ít nhất 10 kí tự'),
//         check('noidung').not().isEmpty().withMessage('Bạn chưa nhập phần nội dung').bail()
//         .isLength({ min: 100 }).withMessage('Tóm tắt phải có ít nhất 100 kí tự'),
//     ]
// }

var validateNewsForm = (data) => {
    let errors = []
    let result = {}
    if (!data.theloai) {
        errors.push({
            value: data.theloai,
            msg: 'Bạn chưa nhập thể loại',
            param: 'theloai',
            location: 'body'
        })
    }
    if (!data.loaitin) {
        errors.push({
            value: data.loaitin,
            msg: 'Bạn chưa nhập loại tin',
            param: 'loaitin',
            location: 'body'
        })
    }
    if (!data.tieude) {
        errors.push({
            value: data.tieude,
            msg: 'Bạn chưa nhập tên tiêu đề',
            param: 'tieude',
            location: 'body'
        })
    } 
    if (!data.tomtat) {
        errors.push({
            value: data.tomtat,
            msg: 'Bạn chưa nhập phần tóm tắt',
            param: 'tomtat',
            location: 'body'
        })
    } else if (data.tomtat.length < 10) {
        errors.push({
            value: data.tomtat,
            msg: 'Tóm tắt phải chứa ít nhất 10 kí tự',
            param: 'tomtat',
            location: 'body'
        })
    }
    if (!data.noidung) {
        errors.push({
            value: data.noidung,
            msg: 'Bạn chưa nhập phần nội dung',
            param: 'noidung',
            location: 'body'
        })
    } else if (data.noidung.length < 100) {
        errors.push({
            value: data.noidung,
            msg: 'Nội dung phải chứa ít nhất 100 kí tự',
            param: 'noidung',
            location: 'body'
        })
    }
    if (errors.length > 0) result.errors = errors
    return result
}

var validateUserForm = () => {
    return [
        check('name').not().isEmpty().withMessage('Bạn chưa nhập tên người dùng').bail()
            .isLength({ min: 3 }).withMessage('Tên người dùng phải có ít nhất 3 kí tự'),
        check('email').not().isEmpty().withMessage('Bạn chưa nhập email').bail()
            .isEmail().withMessage('Email không đúng định dạng. Mời bạn nhập lại. Ví dụ: abc@gmail.com').bail()
            .custom(async (value) => {
                let data = await userModel.getUserByEmail(value)
                if (data.length > 0) {
                  throw new Error('Email này đã có người sử dụng');
                }
                return true;
              }),
        check('password').isLength({ min: 6 }).withMessage('Bạn chưa nhập mật khẩu'),
        check('rePassword').custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Mật khẩu chưa trùng khớp');
            }
            return true;
          })
    ]
}

var validateSlideForm = (data) => {
    let errors = []
    let result = {}
    if (!data.ten) {
        errors.push({
            value: data.ten,
            msg: 'Bạn chưa nhập tên slide',
            param: 'theloai',
            location: 'body'
        })
    }
    if (errors.length > 0) result.errors = errors
    return result
}


module.exports = {
    validateCategoryForm: validateCategoryForm,
    validateNewsTypeForm: validateNewsTypeForm,
    validateNewsForm: validateNewsForm,
    validateUserForm: validateUserForm,
    validateSlideForm: validateSlideForm
}