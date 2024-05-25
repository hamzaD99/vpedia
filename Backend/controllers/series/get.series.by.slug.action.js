const models = require('../../models')
const Category = models.Category
const CategoryFilm = models.CategoryFilm
const Series = models.Series
const Film = models.Film

module.exports.getSeriesBySlug = async (req, res) => {
    const { slug } = req.params
    const includeFilms = req.query.includeFilms == 'true'
    let includes = []

    if (includeFilms) {
        includes.push({
            model: Film,
            as: "Films",
            attributes: {
                exclude: ['film_link']
            },
            include:[{
                model: CategoryFilm,
                as: 'Categories',
                include: [{
                    model: Category,
                    as: 'Category'
                }]
            }]
        })
    }

    let result = null
    await Series.findOne({
        where: {
            slug: slug
        },
        include: includes
    }).then((Series) => {
        result = Series
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
    res.status(200).send(result)

}