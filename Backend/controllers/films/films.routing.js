const { getFilms } = require("./get.films.action")
const { getFilmsById } = require("./get.films.by.id.action")
const { getFilmsBySlug } = require("./get.films.by.slug.action")
const { updateFilms } = require("./update.films.action")
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
            level: 'activeMember',
        },
        put: {
            action: updateFilms,
            level: 'admin'
        }
    },
    '/:slug': {
        get: {
            action: getFilmsBySlug,
            level: 'activeMember',
        },
    }
}