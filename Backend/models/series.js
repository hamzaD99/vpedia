const Sequelize = require("sequelize");

class Series extends Sequelize.Model {
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
                image: DataTypes.STRING,
                slug: DataTypes.STRING,
                createdAt: DataTypes.DATE,
                deletedAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            },
            {
                tableName: 'series',
                sequelize,
            }
        );
    }

    static associate(models) {
        this.myAssociations = this.hasMany(models.Film, { foreignKey: 'series_id', as: 'Films' })
    }

}

module.exports = Series;