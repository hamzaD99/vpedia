const { getAllUsers } = require("./get.all.users.action");
const { createUser } = require("./create.user.action");
const { loginUserByPassword } = require("./login.user.by.password.action");

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
            action: loginUserByPassword,
            level: 'public'
        }
    }
}