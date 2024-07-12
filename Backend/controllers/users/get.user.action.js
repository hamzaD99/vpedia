const models = require('../../models')
const User = models.User
const SubscribedUser = models.SubscribedUser

module.exports.getUser = async (req, res) => {
    let token = req.header('Authorization')
    token = token.split(" ")[1]
    console.log(token)
    await User.findByPk(req.user.id, {
    include: [{
        model: SubscribedUser,
        as: "Subscriptions",
    }]
    })
    .then((user) => {
        return res.status(200).send({'user': user, 'token': token});
    }).catch((err) => {
        console.log(err)
        return null
    })
}