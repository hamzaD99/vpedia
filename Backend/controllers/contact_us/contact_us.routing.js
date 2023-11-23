const { createMessage } = require("./create.message.action");

module.exports = {
    '/': {
        post: {
            action: createMessage,
            level: 'public'
        }
    }
}