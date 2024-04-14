
module.exports.failureLogin = async (req, res, next) => {
    console.log('failure')
    return res.status(401).send({ error: "Wrong Credentials" })
    
}