const models = require('../../models');
const { Op } = require("sequelize");
const Film = models.Film;

module.exports.getFilmsBySeriesId = async (req, res) => {
    const { seriesId } = req.params;
    const { page = 1, pageSize = 10, name } = req.query;
    const offset = (page - 1) * pageSize;

    let wheres = {}
    // name filter
    if(name && name['names'].length){
        wheres[`name_${name['lang'] == 'ar' ? 'arabic' : 'english'}`]={
            [Op.or]: name['names'].map((n) => ({ [Op.like]: `%${n}%` }))
        }
    }
    wheres['series_id'] = seriesId

    Film.findAndCountAll({
        where: wheres,
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
