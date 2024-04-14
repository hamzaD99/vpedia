const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models')
const constents = require('../common/constents');
const UserSeries = models.UserSeries
const User = models.User

async function getUserByHandle(handle){
    if(handle.length < 3) return null
    let userFound;
    let isEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(handle)
    let condtion = isEmail ? { email: handle } : { userName: handle };
    
    await User.findOne({
        where: condtion, include: [{
            model: UserSeries,
            as: "Series_access",
        }]
    })
        .then(async (user) => {
            userFound = user
        }).catch((err) => {
            return res.status(500).send(err)
    })
    return userFound;
}
function getUserByUUID(id){
    console.log(id)
}

function initialize(passport) {
  const authenticateUser = async (handle, password, done) => {
    const user = await getUserByHandle(handle)
    if (user == null) {
      return done(null, false, { message: 'No user with that handle' })
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({
                handle: handle,
                id: user.UUID,
                roleId: user.roleId
            }, constents.JWT_SECERT, { expiresIn: '24h' });
            return done(null, { "user": user, "token": token })
        }
        else {
            return done(null, false, { message: 'Password incorrect' })
        }
    }
    catch (e) {
        return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'handle' }, authenticateUser))
  passport.serializeUser((user, done) => {
    return done(null, user)
  })
  passport.deserializeUser((id, done) => {
    return done(null, getUserByUUID(id))
  })
}

module.exports = initialize