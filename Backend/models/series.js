const Sequelize = require("sequelize");

class Series extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                UUID: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
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
        this.myAssociations = this.hasMany(models.UserSeries, { foreignKey: 'series_id', as: 'Users_access' })
    }

}

module.exports = Series;