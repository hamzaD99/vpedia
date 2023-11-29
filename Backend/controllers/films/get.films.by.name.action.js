const models = require('../../models')
const { Op, where } = require("sequelize");
const Film = models.Film

module.exports.getFilmsByName = async (req, res) => {
    const { name } = req.query
    let wheres = {}
    // name filter
    if(name && name['names'].length){
        wheres[`name_${name['lang'] == 'ar' ? 'arabic' : 'english'}`]={
            [Op.in]: name['names']
        }
    }
    Film.findAll({
        where: wheres,
        attributes: {
            exclude: ['film_link']
        }
    }).then((Films) => {
        return res.send(Films);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
}