
module.exports.sucessLogin = async (req, res, next) => {
    res.status(200).send(req.user)
    return res.redirect(`https://vpedia.info/saml-login?token=${req.user.token}`);
}