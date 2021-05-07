var dbUtil = require('../util/dbUtil') 

module.exports = {
    getAll: async () => {
        let query = "SELECT loaitin.id AS id, theloai.Ten AS TenTheLoai, loaitin.Ten AS Ten, loaitin.TenKhongDau AS TenKhongDau FROM loaitin "
                    + "LEFT JOIN theloai ON loaitin.idTheLoai = theloai.id"
        return await dbUtil.runQuery(query)
    },

    getListByCategory: async (idTheLoai) => {
        let query = "SELECT * FROM loaitin WHERE idTheLoai=" + idTheLoai
        return dbUtil.runQuery(query)
    },

    getByNormalizeName: async (TenKhongDau) => {
        let query = "SELECT * FROM loaitin WHERE TenKhongDau = '" + TenKhongDau + "'" 
        return dbUtil.runQuery(query)
    },

    add: async (loaitin) => {
        let query = "INSERT INTO loaitin SET idTheLoai = " + loaitin.idTheLoai + ", Ten = '" + loaitin.Ten + "', TenKhongDau ='" + loaitin.TenKhongDau + "'"
        return await dbUtil.runQuery(query)
    },

    update: async (loaitin, id) => {
        let query = "UPDATE loaitin SET idTheLoai = " + loaitin.idTheLoai + ", Ten = '" + loaitin.Ten + "', TenKhongDau ='" + loaitin.TenKhongDau + "'" + " WHERE id=" + id
        return await dbUtil.runQuery(query)
    },

    delete: async (id) => {
        console.log(id)
        let query = "DELETE FROM loaitin WHERE id =" + id
        return await dbUtil.runQuery(query)
    }
}
