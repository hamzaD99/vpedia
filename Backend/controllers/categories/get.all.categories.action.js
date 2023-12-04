const models = require('../../models')
const { Op, where } = require("sequelize");
const Category = models.Category

module.exports.getCategories = async (req, res) => {
    const { name } = req.query
    let wheres = {}
    // name filter
    if(name && name['names'].length){
        wheres[`name_${name['lang'] == 'ar' ? 'arabic' : 'english'}`]={
            [Op.or]: name['names'].map((n) => ({ [Op.like]: `%${n}%` }))
        }
    }
    Category.findAll({
        where: wheres
    }).then((categories) => {
        return res.send(categories);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
}