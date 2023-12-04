const models = require('../../models')
const Film = models.Film
const CategoryFilm = models.CategoryFilm
const SubCategoryFilm = models.SubCategoryFilm
const Series = models.Series

module.exports.getFilmsByCategory = async (req, res) => {
    const { categories, subcategories } = req.query
    
    let wheres = {}
    if(categories){
        wheres['$Categories.category_id$'] = {
            [models.Sequelize.Op.in]: categories
        }
    }
    if(subcategories){
        wheres['$SubCategories.subcategory_id$'] = {
            [models.Sequelize.Op.in]: subcategories
        }
    }
    Film.findAll({
        where: wheres,
        attributes: {
            exclude: ['film_link']
        },
        include:[{
            model: CategoryFilm,
            as: 'Categories'
        },
        {
            model: SubCategoryFilm,
            as: 'SubCategories' 
        },
        {
            model: Series,
            as: 'Series' 
        }]
    }).then((Films) => {
        return res.send(Films);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
}