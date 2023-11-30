const models = require('../../models')
const Series = models.Series

module.exports.checkAccess = async (req, res) => {
    const { series_id, user_token } = req.query
    let includes = []

    await Series.findByPk(series_id, {
        where: {
            slug: slug
        },
        include: includes
    }).then((film) => {
        res.send(film)
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
}