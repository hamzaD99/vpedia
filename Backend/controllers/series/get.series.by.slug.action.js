const models = require('../../models')
const Series = models.Series
const Film = models.Film

module.exports.getSeriesBySlug = async (req, res) => {
    const { slug } = req.params
    const includeFilms = req.query.includeFilms == 'true'


    let result = null
    await Series.findOne({
        where: {
            slug: slug
        }
    }).then((Series) => {
        result = Series
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })

    if (includeFilms) {
        let queryOptions = {
            include: [{
                model: Film,
                as: "Films",
                where: {
                    series_id: result.UUID
                }
            }]
        };
        await Series.findByPk(result.UUID, queryOptions).then((Series) => {
            result = Series
        }).catch((err) => {
            console.log(err);
            return res.sendStatus(500);
        })
    }
    res.send(result)

}