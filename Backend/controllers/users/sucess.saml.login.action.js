module.exports.sucessSAMLLogin = async (req, res, next) => {
    return res.redirect(`https://vpedia.info/saml-login?token=${req.user.token}`);
}