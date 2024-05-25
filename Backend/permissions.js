const models = require('./models')
const jwt = require('jsonwebtoken');
const constents = require('./common/constents');
const SubscribedUser = models.SubscribedUser
const User = models.User

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
    activeMember: async (req, res, next) => {
        if (! await isActiveMember(req)) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        next();
    },
    admin: (req, res, next) => {
        if (!isAdmin(req)) {
            return res.status(401).json({ error: 'Unathurized' });
        }
        next();
    },
}

const isValidToken = (req) => {
    let token = req.header('Authorization');
    if (!token) return false
    try {
        token = token.split(" ")[1]
        const decoded = jwt.verify(token, constents.JWT_SECERT);
        req.user = decoded;
        return true
    } catch (error) {
        return false
    }
};

const isAdmin = (req) => {
    if(!isValidToken(req)) return false
    if(req.user && req.user.roleId == 7) return true
    return false
}

const isActiveMember = async (req) => {
    if(!isValidToken(req)) return false

    let id = req.user ? req.user.id : null
    let userFound = await User.findByPk(id,{
        include:[{
            model: SubscribedUser,
            as: "Subscriptions",
        }]
    })
    if(!userFound || !userFound.Subscriptions.length) return false
    const expiredAtDates = userFound.Subscriptions.map((subscription) => subscription.expiredAt)
    if(!expiredAtDates.length) return false
    const maxExpiredAtDate = new Date(Math.max(...expiredAtDates));
    const currentDate = new Date();
    if (maxExpiredAtDate < currentDate) return false
    return true
}

module.exports = level => (req, res, next) => levels[level](req, res, next);