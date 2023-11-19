const { getSeries } = require("./get.all.series.action");
module.exports = {
    '/': {
        get: {
            action: getSeries,
            level: 'public',
        },
    },
}