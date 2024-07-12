const { getAllUsers } = require("./get.all.users.action");
const { getUser } = require("./get.user.action");
const { createUser } = require("./create.user.action");
const { failureLogin } = require("./failure.login.action");
const { sucessLogin } = require("./sucess.login.action");
const { sucessSAMLLogin } = require("./sucess.saml.login.action");
const { passwordMiddleware, SAMLMiddleware } = require('../../login-middlewares')

module.exports = {
    '/': {
        get: {
            action: getAllUsers,
            level: 'admin',
        },
        post: {
            action: createUser,
            level: 'public'
        }
    },
    '/login': {
        post: {
            middlewares: passwordMiddleware,
            action: sucessLogin,
            level: 'public'
        }
    },
    '/saml-login': {
        post: {
            middlewares: SAMLMiddleware,
            action: sucessSAMLLogin,
            level: 'public'
        }
    },
    '/failure-login': {
        get: {
            action: failureLogin,
            level: 'public'
        }
    },
    '/get': {
        get: {
            action: getUser,
            level: 'member'
        }
    }
}