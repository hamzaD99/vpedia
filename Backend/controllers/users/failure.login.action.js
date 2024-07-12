
module.exports.failureLogin = async (req, res, next) => {
    res.status(401).send({ error: "Wrong Credentials" })
    return res.redirect(`https://vpedia.info/saml-login?token=not_cool`);
}