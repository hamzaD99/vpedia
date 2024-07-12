module.exports.failureLogin = async (req, res, next) => {
    return res.status(401).send({ error: "Wrong Credentials" })
}