const models = require('../../models')
const User = models.User

module.exports.getAllUsers = async (req, res) => {
    User.findAll().then((users) => {
        return res.send(users);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
}