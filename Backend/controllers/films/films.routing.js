const { getFilms } = require("./get.films.action")
const { getFilmsById } = require("./get.films.by.id.action")
const { getFilmsBySlug } = require("./get.films.by.slug.action")
const { getFilmsByCategory } = require("./get.films.by.category.action")
module.exports = {
    '/': {
        get: {
            action: getFilms,
            level: 'public',
        },
    },
    'id/:id': {
        get: {
            action: getFilmsById,
            level: 'member',
        },
    },
    '/by-category': {
        get: {
            action: getFilmsByCategory,
            level: 'public',
        },
    },
    '/:slug': {
        get: {
            action: getFilmsBySlug,
            level: 'member',
        },
    }
}