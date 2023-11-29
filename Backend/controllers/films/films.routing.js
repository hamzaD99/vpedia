const { getFilmsByName } = require("./get.films.by.name.action");
const { getFilmsBySeriesId } = require("./get.films.by.series.action")
const { getFilmsById } = require("./get.films.by.id.action")
module.exports = {
    '/': {
        get: {
            action: getFilmsByName,
            level: 'public',
        },
    },
    'seriesId/:seriesId': {
        get: {
            action: getFilmsBySeriesId,
            level: 'public',
        },
    },
    'id/:id': {
        get: {
            action: getFilmsById,
            level: 'member',
        },
    }
}