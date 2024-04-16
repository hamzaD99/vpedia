
module.exports.sucessLogin = async (req, res, next) => {
    return res.status(200).send(req.user)
}