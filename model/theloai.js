var dbUtil = require('../util/dbUtil') 

module.exports = {
    getAll: async () => {
        let query = "SELECT * FROM theloai"
        return await dbUtil.runQuery(query)
    },

    add: async (theloai) => {
        let query = "INSERT INTO theloai SET Ten = '" + theloai.Ten + "', TenKhongDau ='" + theloai.TenKhongDau + "'"
        return await dbUtil.runQuery(query)
    },

    update: async (theloai, id) => {
        let query = "UPDATE theloai SET Ten = '" + theloai.Ten + "', TenKhongDau ='" + theloai.TenKhongDau + "' WHERE id=" + id
        return await dbUtil.runQuery(query)
    },

    delete: async (id) => {
        let query = "DELETE FROM theloai WHERE id =" + id
        return await dbUtil.runQuery(query)
    }
}
