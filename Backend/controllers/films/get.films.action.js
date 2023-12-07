const models = require('../../models');
const { Op } = require("sequelize");
const Film = models.Film;
const Category = models.Category
const CategoryFilm = models.CategoryFilm
const Series = models.Series

module.exports.getFilms = async (req, res) => {
    const { page = 1, pageSize = 10, name, seriesId } = req.query;
    const offset = (page - 1) * pageSize;
    const includeSeries = req.query.includeSeries === 'true'

    let wheres = {}
    let includes = [{
        model: CategoryFilm,
        as: 'Categories',
        include: [{
            model: Category,
            as: 'Category'
        }]
    }]
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
        attributes: {
            exclude: ['film_link']
        },
        include: includes,
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
