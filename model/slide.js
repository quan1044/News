var dbUtil = require('../util/dbUtil')

module.exports = {
    getAll: async () => {
        let query = "SELECT * FROM slide"
        return await dbUtil.runQuery(query)
    },

    getImageByID: async (id) => {
        let query = "SELECT Hinh FROM slide WHERE id = " + id
        let data = await dbUtil.runQuery(query)
        return data[0].Hinh
    },

    add: async (slide) => {
        let query = "INSERT INTO slide SET Ten = '" + slide.Ten + "', Hinh = '"
            + slide.Hinh + "', NoiDung = '" + slide.NoiDung + "', link = '"
            + slide.link + "'"
        return await dbUtil.runQuery(query)
    },

    delete: async (id) => {
        let query = "DELETE FROM slide WHERE id =" + id
        return await dbUtil.runQuery(query)
    },

    update: async (slide, id) => {
        let query = "UPDATE slide SET Ten = '" + slide.Ten + "', Hinh = '"
            + slide.Hinh + "', NoiDung = '" + slide.NoiDung + "', link = '"
            + slide.link + "' WHERE id = " + id 
        return await dbUtil.runQuery(query)
    },


}
