const models = require('../../models')
const Category = models.Category
const SubCategory = models.SubCategory
const CategoryFilm = models.CategoryFilm
const SubCategoryFilm = models.SubCategoryFilm
const Film = models.Film
const Series = models.Series
const User = models.User
const UserSeries = models.UserSeries

module.exports.getFilmsBySlug = async (req, res) => {
    let id = req.user ? req.user.id : null
    const { slug } = req.params
    const includeSeries = req.query.includeSeries == 'true'
    const includeCategories = req.query.includeCategories == 'true'
    const includeSubCategories = req.query.includeSubCategories == 'true'
    
    let userFound = await User.findPk(id,{
        include:[{
            model: UserSeries,
            as: "Series_access",
        }]
    })
    if(!userFound) return res.sendStatus(500);
    const seriesIds = userFound.Series_access.map((access) => access.series_id)
    if(!seriesIds.length) return res.sendStatus(500);

    let includes = []
    if(includeSeries){
        includes.push({
            model: Series,
            as: 'Series'
        })
    }
    if(includeCategories){
        includes.push({
            model: CategoryFilm,
            as: 'Categories',
            include: [{
                model: Category,
                as: 'Category'
            }]
        })
    }
    if(includeSubCategories){
        includes.push({
            model: SubCategoryFilm,
            as: 'SubCategories',
            include: [{
                model: SubCategory,
                as: 'SubCategory'
            }]
        })
    }
    await Film.findOne({
        where: {
            slug: slug
        },
        include: includes
    }).then((film) => {
        if(!seriesIds.includes(film.series_id)) return res.sendStatus(500);
        res.send(film)
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
}