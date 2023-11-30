const models = require('../../models')
const Film = models.Film
const Series = models.Series

module.exports.getFilmsBySlug = async (req, res) => {
    console.log(req.user)
    const { slug } = req.params
    const includeSeries = req.query.includeSeries == 'true'
    let includes = []

    if(includeSeries){
        includes.push({
            model: Series,
            as: 'Series'
        })
    }
    await Film.findOne({
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