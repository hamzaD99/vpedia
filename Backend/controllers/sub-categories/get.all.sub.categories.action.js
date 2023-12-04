const models = require('../../models')
const { Op, where } = require("sequelize");
const SubCategory = models.SubCategory

module.exports.getSubCategories = async (req, res) => {
    const { name, categoryId } = req.query
    let wheres = {}
    // name filter
    if(name && name['names'].length){
        wheres[`name_${name['lang'] == 'ar' ? 'arabic' : 'english'}`]={
            [Op.or]: name['names'].map((n) => ({ [Op.like]: `%${n}%` }))
        }
    }
    if(categoryId){
        wheres['category_id']={
            [Op.in]: categoryId
        }
    }
    SubCategory.findAll({
        where: wheres
    }).then((categories) => {
        return res.send(categories);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
}