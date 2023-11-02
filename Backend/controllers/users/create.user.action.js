const models = require('../../models')
const User = models.User
const bcrypt = require('bcrypt');

module.exports.createUser = async (req, res) => {
    const { name, email, password, userName } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({name: name, email: email, password: hashedPassword, userName: userName})
    .then(async (user) => {
        return res.status(201).send(await User.findByPk(user.UUID));
    }).catch((err) => {
        return res.status(500).send({ error: err })
    })
}