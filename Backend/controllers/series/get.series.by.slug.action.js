const models = require('../../models')
const User = models.User
const UserSeries = models.UserSeries
const Category = models.Category
const CategoryFilm = models.CategoryFilm
const Series = models.Series
const Film = models.Film

module.exports.getSeriesBySlug = async (req, res) => {
    const { slug } = req.params
    const includeFilms = req.query.includeFilms == 'true'
    const includeUsers = req.query.includeUsers == 'true'
    let includes = []

    if(includeUsers) includes.push({
        model: UserSeries,
        as: "Users_access",
        include: [{
            model: User,
            as: 'User'
        }]
    })

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

    if (includeFilms && result) {
        let queryOptions = {
            include: [{
                model: Film,
                as: "Films",
                where: {
                    series_id: result.id
                },
                include:[{
                    model: CategoryFilm,
                    as: 'Categories',
                    include: [{
                        model: Category,
                        as: 'Category'
                    }]
                }]
            }]
        };
        await Series.findByPk(result.id, queryOptions).then((Series) => {
            result = Series
        }).catch((err) => {
            console.log(err);
            return res.sendStatus(500);
        })
    }
    res.send(result)

}