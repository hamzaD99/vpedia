const models = require('../../models');
const { Op } = require("sequelize");
const Film = models.Film;
const Category = models.Category
const CategoryFilm = models.CategoryFilm
const Series = models.Series

module.exports.getFilms = async (req, res) => {
    const { page = 1, pageSize = 10, name, seriesId, categories } = req.query;
    const offset = (page - 1) * pageSize;
    const includeSeries = req.query.includeSeries === 'true'
    const includeCategories = req.query.includeCategories === 'true'

    let wheres = {}
    let includes = []

    if(includeCategories){
        let categoryWhere = {}
        if (categories) {
            const categoriesList = JSON.parse(categories);
            categoryWhere['category_id'] = { [Op.in]: categoriesList };
        }    
        if (includeCategories) {
            includes.push({
                model: CategoryFilm,
                as: 'Categories',
                where: categoryWhere,
                include: [{
                    model: Category,
                    as: 'Category'
                }],
                required: true
            });
        }
    }

    // name filter
    if(name && name['names'].length){
        wheres[`name_${name['lang'] == 'ar' ? 'arabic' : 'english'}`]={
            [Op.or]: name['names'].map((n) => ({ [Op.like]: `%${n}%` }))
        }
    }
    if(seriesId){
        wheres['series_id'] = seriesId
    }
    if(includeSeries){
        includes.push({
            model: Series,
            as: 'Series' 
        })
    }
    Film.findAndCountAll({
        where: wheres,
        include: includes,
        attributes: {
            exclude: ['film_link']
        },
        limit: parseInt(pageSize),
        offset: parseInt(offset),
    })
    .then((result) => {
        const films = result.rows;
        const totalCount = result.count;

        const totalPages = Math.ceil(totalCount / pageSize);

        return res.send({
            films,
            pagination: {
                page: parseInt(page),
                pageSize: parseInt(pageSize),
                totalCount,
                totalPages,
            },
        });
    })
    .catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    });
};
