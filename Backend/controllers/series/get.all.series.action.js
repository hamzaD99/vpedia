const models = require('../../models')
const { Op, where } = require("sequelize");
const Series = models.Series

module.exports.getSeries = async (req, res) => {
    const { name } = req.query
    let wheres = {}
    // name filter
    if(name && name['names'].length){
        wheres[`name_${name['lang'] == 'ar' ? 'arabic' : 'english'}`]={
            [Op.in]: name['names']
        }
    }
    Series.findAll({
        where: wheres
    }).then((Series) => {
        return res.send(Series);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
}