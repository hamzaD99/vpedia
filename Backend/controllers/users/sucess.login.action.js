
module.exports.sucessLogin = async (req, res, next) => {
    console.log('sucess')
    console.log(req.user)
    return res.status(200)
    
}