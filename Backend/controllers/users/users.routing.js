const { getAllUsers } = require("./get.all.users.action");
const { createUser } = require("./create.user.action");
const { failureLogin } = require("./failure.login.action");
const { sucessLogin } = require("./sucess.login.action");
const { passwordMiddleware } = require('../../login-middlewares')

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
    '/failure-login': {
        get: {
            action: failureLogin,
            level: 'public'
        }
    }
}