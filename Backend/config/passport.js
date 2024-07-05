const LocalStrategy = require('passport-local').Strategy
const SamlStrategy = require('passport-saml').Strategy
const { MultiSamlStrategy } = require('passport-saml');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models')
const constents = require('../common/constents');
const SubscribedUser = models.SubscribedUser
const User = models.User
const Institution = models.Institution

async function getUserByHandle(handle){
    if(handle.length < 3) return null
    let userFound;
    let isEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(handle)
    let condtion = isEmail ? { email: handle } : { userName: handle };
    
    await User.findOne({
      where: condtion, include: [{
        model: SubscribedUser,
        as: "Subscriptions",
      }]
    })
      .then(async (user) => {
        userFound = user
      }).catch((err) => {
        console.log(err)
        return null
      })
    return userFound;
}

function initialize(passport) {
  const authenticateUserPassword = async (handle, password, done) => {
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
  const authenticateUserSAML = async (request, handle, done) => {
    const institution = request.institution
    const user_handle = handle.nameID
    const issuer = handle.issuer
    let user_found = await getUserByHandle(`${issuer}_${user_handle}`)
    if (user_found == null) {
      await User.create({name: handle.attributes['name'], email: handle.attributes['emailaddress'], userName: `${issuer}_${user_handle}`, institutionId: institution.UUID})
      .then((user) => {
        user_found = user
      }).catch((err) => {
        console.log(err)
        return done(new Error('Something went wrong'));
      })
    }
    if(user_found.institutionId == institution.UUID){
      const token = jwt.sign({
        handle: user_found.userName,
        id: user_found.UUID,
        roleId: user_found.roleId
      }, constents.JWT_SECERT, { expiresIn: '24h' });
    return done(null, { "user": user_found, "token": token })
    }
    else return done(null, false, { message: 'The user is not connected with the institution' })
  }

  const findProvider = async (request, done) => {
    const issuer = request.query.issuer;
    if (!issuer) {
      console.error('Issuer is required');
      return done(new Error('Issuer is required'));
    }
    let idp = null
    await Institution.findOne({
      where: {
        issuer: issuer
      }
      }).then((institution) => {
        idp = institution
      }).catch((err) => {
        console.log(err)
        return done(null, null);
      })
    if (!idp) {
      console.error('Issuer not found');
      return done(new Error('Issuer not found'));
    }
    request.institution = {
      UUID: idp.UUID,
      name_arabic: idp.name_arabic,
      name_english: idp.name_english,
      issuer: idp.issuer
    }
    const samlConfig = {
      path: '/users/saml-login',
      entryPoint: idp.entryPoint,
      issuer: idp.issuer,
      cert: idp.cert,
      logoutUrl: idp.logoutUrl,
      callbackUrl: idp.callbackUrl
    };

    return done(null, samlConfig);
  }

  passport.use(new MultiSamlStrategy(
    {
      passReqToCallback: true,
      getSamlOptions: function(request, done) {
        findProvider(request, done);
      }
    },
    authenticateUserSAML)
  );
  passport.use(new LocalStrategy({ usernameField: 'handle' }, authenticateUserPassword))
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    return done(null, user)
  })
}

module.exports = initialize