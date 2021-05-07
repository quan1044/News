var dbUtil = require('../util/dbUtil')

module.exports = {
    getAll: async () => {
        let query = "SELECT tintuc.ID AS id, tintuc.TieuDe AS TieuDe, tintuc.TomTat AS TomTat, tintuc.Hinh AS Hinh, "
            + "theloai.Ten AS TheLoai, loaitin.Ten AS LoaiTin, tintuc.SoLuotXem AS Xem, tintuc.NoiBat AS NoiBat "
            + "FROM tintuc LEFT JOIN loaitin ON tintuc.idLoaiTin = loaitin.id "
            + "LEFT JOIN theloai ON loaitin.idTheLoai = theloai.id"
        return await dbUtil.runQuery(query)
    },

    getByNewsType: async (idLoaiTin, page) => {
        let offset = (page - 1) * 5
        let query = "SELECT * FROM tintuc WHERE idLoaiTin = " + idLoaiTin + " ORDER BY id DESC LIMIT 5 OFFSET " + offset
        return await dbUtil.runQuery(query)
    },

    getByNormalizeTitle: async (TieuDeKhongDau) => {
        let query = "SELECT * FROM tintuc WHERE TieuDeKhongDau = '" + TieuDeKhongDau + "'"
        return await dbUtil.runQuery(query)
    },

    getRelativeNewsByIdAndIdLoaiTin: async (id, idLoaiTin) => {
        let query = "SELECT * FROM tintuc WHERE idLoaiTin = " + idLoaiTin + " AND NOT id = " + id +" ORDER BY id DESC LIMIT 4"
        return await dbUtil.runQuery(query)
    },

    getImageByID: async (id) => {
        let query = "SELECT Hinh FROM tintuc WHERE id = " + id
        let data = await dbUtil.runQuery(query)
        return data[0].Hinh
    },

    getHighlightNewsByCategory: async (idTheloai) => {
        let query = "SELECT tintuc.TieuDe, tintuc.Hinh, tintuc.TomTat, tintuc.TieuDeKhongDau, theloai.Ten FROM tintuc LEFT JOIN loaitin ON tintuc.idLoaiTin = loaitin.id "
                    + "LEFT JOIN theloai ON loaitin.idTheLoai = theloai.id WHERE tintuc.NoiBat = 1 AND theloai.id = " 
                    + idTheloai + " ORDER BY tintuc.id DESC LIMIT 5"
        return await dbUtil.runQuery(query)

    },

    getHighlightNews: async () => {
        let query = "SELECT tintuc.TieuDe, tintuc.Hinh, tintuc.TomTat, tintuc.TieuDeKhongDau, theloai.Ten FROM tintuc LEFT JOIN loaitin ON tintuc.idLoaiTin = loaitin.id "
                    + "LEFT JOIN theloai ON loaitin.idTheLoai = theloai.id WHERE tintuc.NoiBat = 1 ORDER BY tintuc.id DESC LIMIT 4"
        return await dbUtil.runQuery(query)
    },

    add: async (tintuc) => {
        let query = "INSERT INTO tintuc SET idLoaiTin = " + tintuc.idLoaiTin + ", TieuDe = '"
            + tintuc.TieuDe + "', TieuDeKhongDau = '" + tintuc.TieuDeKhongDau + "', TomTat = '"
            + tintuc.TomTat + "', NoiDung = '" + tintuc.NoiDung + "', NoiBat = " + tintuc.NoiBat
            + ", Hinh = '" + tintuc.Hinh + "'"
        return await dbUtil.runQuery(query)
    },

    delete: async (id) => {
        let query = "DELETE FROM tintuc WHERE id =" + id
        return await dbUtil.runQuery(query)
    },

    update: async (tintuc, id) => {
        console.log('update')
        let query = "UPDATE tintuc SET idLoaiTin = " + tintuc.idLoaiTin + ", TieuDe = '"
            + tintuc.TieuDe + "', TieuDeKhongDau = '" + tintuc.TieuDeKhongDau + "', TomTat = '"
            + tintuc.TomTat + "', NoiDung = '" + tintuc.NoiDung + "', NoiBat = " + tintuc.NoiBat
            + ", Hinh = '" + tintuc.Hinh + "' WHERE id = " + id 
        return await dbUtil.runQuery(query)
    },


}
