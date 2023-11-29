const models = require('../../models')
const Film = models.Film

module.exports.getFilmsById = async (req, res) => {
    const { id } = req.params
    Film.findByPk(id).then((Film) => {
        return res.send(Film);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
}