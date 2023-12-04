const { getCategories } = require("./get.all.categories.action");

module.exports = {
    '/': {
        get: {
            action: getCategories,
            level: 'public',
        },
    },
}