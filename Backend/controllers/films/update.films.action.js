const models = require('../../models');
const { Op } = require("sequelize");
const Film = models.Film;

module.exports.updateFilms = async (req, res) => {
    const { id } = req.params
    const { language, description } = req.body;
    Film.findByPk(id).then(async (Film) => {
        if(Film){
            if(language === 'ar'){
                Film.description_arabic = description
            }
            else if(language === 'en'){
                Film.description_english = description
            }
            else{
                return res.status(400).json({ error: 'Invalid language provided' });
            }
            await Film.save()
            return res.status(200).json({ message: 'Film updated successfully' });
        }
        else return res.status(404).json({ error: 'Film not found' });
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
};
