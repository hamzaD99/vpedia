const models = require('../../models')
const User = models.User

module.exports.createUser = async (req, res) => {
    data = req.body
    await User.create(data)
    .then((user) => {
        return res.send(user);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
}