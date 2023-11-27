const models = require('../../models')
const { Op, where } = require("sequelize");
const Series = models.Series

module.exports.getSeriesBySlug = async (req, res) => {
    const { slug } = req.params
    Series.findOne({
        where: {
            slug: slug
        }
    }).then((Series) => {
        return res.send(Series);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
}