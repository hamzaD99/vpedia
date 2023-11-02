const { getAllUsers } = require("./get.all.users.action");
const { createUser } = require("./create.user.action")

module.exports = {
    '/': {
        get: {
            action: getAllUsers,
            level: 'member',
        },
        post: {
            action: createUser,
            level: 'member'
        }
    },
}