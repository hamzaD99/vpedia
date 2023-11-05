const jwt = require('jsonwebtoken');
const constents = require('./common/constents');

const levels = {
    public: (req, res, next) => {
        next();
    },
    member: (req, res, next) => {
        if (!isValidToken(req)) {
            return res.status(401).json({ error: 'Not valid token' });
        }
        next();
    },
}

const isValidToken = (req) => {
    let token = req.header('Authorization');
    if (!token) {
        return false
    }
    try {
        token = token.split(" ")[1]
        const decoded = jwt.verify(token, constents.JWT_SECERT);
        req.user = decoded;
        return true
    } catch (error) {
        return false
    }
};

module.exports = level => (req, res, next) => levels[level](req, res, next);