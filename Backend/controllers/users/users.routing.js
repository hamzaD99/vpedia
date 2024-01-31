const { getAllUsers } = require("./get.all.users.action");
const { createUser } = require("./create.user.action");
const { loginUser } = require("./login.user.action");

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
            action: loginUser,
            level: 'public'
        }
    }
}