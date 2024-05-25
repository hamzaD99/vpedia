const Sequelize = require("sequelize");

class Film extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
               id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name_arabic: DataTypes.STRING,
                name_english: DataTypes.STRING,
                description_arabic: DataTypes.STRING,
                description_english: DataTypes.STRING,
                reviewer_id: DataTypes.INTEGER,
                film_link: DataTypes.STRING,
                slug: DataTypes.STRING,
                series_id: DataTypes.INTEGER,
                order: DataTypes.INTEGER,
                createdAt: DataTypes.DATE,
                deletedAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            },
            {
                tableName: 'films',
                sequelize,
            }
        );
    }

    static associate(models) {
        this.myAssociations = this.belongsTo(models.Series, { foreignKey: 'series_id', as: 'Series' });
        this.myAssociations = this.belongsTo(models.ScientificReviewer, { foreignKey: 'reviewer_id', as: 'Reviewer' });
        this.myAssociations = this.hasMany(models.CategoryFilm, { foreignKey: 'film_id', as: 'Categories' });
    }

}

module.exports = Film;