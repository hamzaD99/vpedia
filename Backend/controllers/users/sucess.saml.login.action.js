module.exports.sucessSAMLLogin = async (req, res, next) => {
    return res.redirect(`https://vpedia.info/saml-login-fe?token=${req.user.token}`);
}