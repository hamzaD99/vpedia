const { getSeries } = require("./get.all.series.action");
const { getSeriesBySlug } = require("./get.series.by.slug.action")
module.exports = {
    '/': {
        get: {
            action: getSeries,
            level: 'public',
        },
    },
    '/:slug': {
        get: {
            action: getSeriesBySlug,
            level: 'public',
        },
    }
}