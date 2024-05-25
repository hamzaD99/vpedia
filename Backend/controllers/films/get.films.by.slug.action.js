const models = require('../../models')
const Category = models.Category
const CategoryFilm = models.CategoryFilm
const Film = models.Film
const ScientificReviewer = models.ScientificReviewer
const Series = models.Series

module.exports.getFilmsBySlug = async (req, res) => {
    const { slug } = req.params
    const includeSeries = req.query.includeSeries == 'true'
    const includeCategories = req.query.includeCategories == 'true'
    const includeScientificReviewer = req.query.includeScientificReviewer == 'true'
    
    let includes = []
    if(includeSeries){
        includes.push({
            model: Series,
            as: 'Series'
        })
    }
    if(includeScientificReviewer){
        includes.push({
            model: ScientificReviewer,
            as: 'Reviewer'
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