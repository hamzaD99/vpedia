const LocalStrategy = require('passport-local').Strategy
const SAMLStrategy = require('passport-saml').Strategy
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
  const authenticateUserSAML = async (handle, done) => {
    console.log(Object.keys(handle.getAssertion().Assertion))
    console.log("---------------------------")
    console.log(JSON.stringify(handle.getAssertion().Assertion.AttributeStatement, null, 2));
    console.log("---------------------------")
    console.log(JSON.stringify(handle.getAssertion().Assertion.Subject, null, 2));
    return done(null, false, { message: 'Password incorrect' })
  }

  passport.use(new LocalStrategy({ usernameField: 'handle' }, authenticateUserPassword))
  passport.use(new SAMLStrategy({ 
    path: '/login/callback',
    // entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
    issuer: 'passport-saml',
    cert: `-----BEGIN CERTIFICATE-----
MIIEqjCCApICCQDM/kTwjAterTANBgkqhkiG9w0BAQsFADAXMRUwEwYDVQQDDAx0
aGFtZWVyYS5jb20wHhcNMjEwNzA0MTExNjIxWhcNMjQwNzAzMTExNjIxWjAXMRUw
EwYDVQQDDAx0aGFtZWVyYS5jb20wggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIK
AoICAQC9MJIFQ4WXB8G2qKeQTOPcfjj/QUuv9wfeNt7H3PwKNEdLD5iy9WHRCq8b
1dLyuQbRlubaW9UWXVfwXx+xpPakqUwxf3mj5aQFXykVQ571RtpYsihZT6O9Po4d
Hx5CNUh/nLvXZ++7rvgVSmSP87T7Y511i24G5zH73AsUGJtdADGAskoVXmeleTOk
4YYKdU3i0M6HGIolkGGCFLXtIuqbC5IE25KVp5F71p8c1Lk9h87NOD6TZaQBrENU
1aRie4x+Qb1Kx/eWY1RWgGpONBvhpeSbzTrkiLBPGxqStRUqfjG09KcuWj/CUdYf
5VkMLtYJI19BI/1UFCmiRuzd7ChnuBChiF7keJwi3OWGPDhdqK9Zy9jrAAH0ntuY
ZtEe6DXBFKUHLA9xTxJDu7wc87ciaw+U3QOv3AAhKxDI90kek3uqPfwsID50x6sL
NFQtA8BUYYwOJMA1aW/UCrC6uv6X4EzvXsFbZJ5fBiF3KfiO41294TBi5zdsGcnQ
NALfjukXS+/YHCHPwPxFx5W7GOYuoY5pRX5L0+fI9zJbQXy/b6oNYjomBmzhVplT
xBrERWW1RQhUSSBkOFJJpC9ZGIeFjVvgcpKrAUYPDJKY659Q6l5SyZGMSsfo/UPW
XRVniNU6ljP/mxQ4bECyVJNYPhCp6tq27CuTjte7CAXWKrALAQIDAQABMA0GCSqG
SIb3DQEBCwUAA4ICAQAWbmDYCbrXkxN3qK8v5xUvCUdCyBDY7KIUtBxI+5CCxWgF
YgYpVvzzLtFjJh0axy2eQl4RZswrHXBISD3AJVjXzp8QvfMb0JEgk91nIqQbK4Sn
Et82XUbUy+18MkEKA/i2FO90qHu1nRvGMQFVIfhbJZw0oeB5kj6BpCK4cr6BRh84
Qmmd3SVIGtZOFPFMYyha6yEszyv5VH/wfPPu2kZGyPiJPI149srdSapKR/GxfAnH
4P8KX89UkVU0kfFkuA17VOSg/KSk7KWYNorhteQqAVRDAdqtNettNQBWGzxWE7gv
YhY+8ZBPDyGyorJ3OPzV1LCNqQW3mGamG35xuAqkbt/g9INwgrLtlWST8bKEG0v1
N11sQAfDaGCBNSBNE6zTU181/e1f2jKYf/pFHNgOy4Uo7Fsocm0TdIqOqMk88ct2
oT4yRPG1+Q7wwI4CQxSpzKcOjUbLfiidVKH2up7ZDVR2bF2n0fKrZu/6/OKzD5M/
mkQFefFBSKofsoqBi2PqJSlpQMEi4xQSk3bDiXyJOeuHcBZ5ucEJd8P4lL+qYjXc
t2qVEdtRi3lVVPRUIe7InsXxrGZ1WJtozInNHWabcF+go+s3ElWbHBxCLTTESKF2
v74GF+5mclPBSaWNUoiXz38X+klj0+4L/6nZrBzQL7OYjOQcGw5/oGtHI3ryjw==
-----END CERTIFICATE-----
    `
   }, authenticateUserSAML))
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    return done(null, user)
  })
}

module.exports = initialize