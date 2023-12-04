const { getSubCategories } = require("./get.all.sub.categories.action");

module.exports = {
    '/': {
        get: {
            action: getSubCategories,
            level: 'public',
        },
    },
}