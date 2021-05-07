var dbUtil = require('../util/dbUtil')
const bcrypt = require('bcrypt');
const { reject } = require('async');
const saltRounds = 2;

module.exports = {
    getAll: async () => {
        let query = "SELECT * FROM users"
        return await dbUtil.runQuery(query)
    },

    getUserByEmail: async (email) => {
        let query = "SELECT * FROM users WHERE email ='" + email + "'"
        return await dbUtil.runQuery(query)
    },

    add: async (user) => {
        let query = "INSERT INTO users SET name = '" + user.name + "', email = '" + user.email
            + "', quyen =" + user.quyen + ", password ='" + user.password + "'"
        return await dbUtil.runQuery(query)
    },

    update: async (loaitin, id) => {
        let query = "UPDATE loaitin SET idTheLoai = " + loaitin.idTheLoai + ", Ten = '" + loaitin.Ten + "', TenKhongDau ='" + loaitin.TenKhongDau + "'" + " WHERE id=" + id
        return await dbUtil.runQuery(query)
    },

    delete: async (id) => {
        let query = "DELETE FROM users WHERE id =" + id
        return await dbUtil.runQuery(query)
    },

    login: async (email, password) => {
        let query = "SELECT * FROM users WHERE email = '" + email + "'"
        let data = await dbUtil.runQuery(query)
        return new Promise((resolve, reject) => {
            if (data.length > 0) {
                bcrypt.compare(password, data[0].password).then(function (result) {
                    if (result) resolve(data)
                    else reject('Error')
                });
            } else {
                return reject('Error')
            }
        })
        
    }
}
